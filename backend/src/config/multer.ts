import aws from 'aws-sdk';
import crypto from 'crypto';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import { promisify } from "util";

const s3 = new aws.S3();
const storageTypes = {
  local: multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (request, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          return callback(err, '');
        }

        const originalName = file.originalname.split(' ').join('-')

        file.key = `${hash.toString('hex')}-${originalName}`;
        callback(null, file.key);
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'happyupload',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const originalName = file.originalname.split(' ').join('-')
        const fileName = `${hash.toString('hex')}-${originalName}`;
        cb(null, fileName);
      })
    },
  })
}

const config: multer.Options = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (request, file, callback) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type.'));
    }
  },
}

export const deleteImagesAWS = async (files: { key: string }[]) => {
  Promise.all(
    files.map((image) => {
      return new Promise((resolve, reject) => {
        s3
          .deleteObject({
            Bucket: 'happyupload',
            Key: image.key,
          })
          .promise()
      });
    })
  )
    .then((response) => response)
    .catch((err) => err);
};

export default config;


