import { Request, Response } from "express";
import User from "../models/User";
import PasswordHash from "../utils/passwordHash";
import usersView from "../views/users_view";
import * as Yup from "yup";
import { getRepository } from "typeorm";
import crypto from 'crypto';
import mailer from '../config/mailer';


export default {
  async authenticate(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const schema = Yup.object().shape({
        email: Yup.string().required(),
        password: Yup.string().required(),
      });

      await schema.validate({ email, password }, { abortEarly: false, }).catch(function (err) {
        err.inner.forEach((e: { message: any; }) => {
          return res.status(400).json({ error: e.message });
        });
      })

      const userRepository = getRepository(User);

      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      if (!(await PasswordHash.checkHash(password, user.password))) {
        return res.status(400).json({ error: "Invalid password" });
      }

      return res.json({
        user: { ...user, password: undefined },
        token: user.generateToken(),
      });
    } catch (err) {
      return res.status(400).json({ error: 'User authentication failed' })
    }
  },

  async forgot(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const schema = Yup.object().shape({
        email: Yup.string().required(),
      });

      await schema.validate({ email }, { abortEarly: false, }).catch(function (err) {
        err.inner.forEach((e: { message: any; }) => {
          return res.status(400).json({ error: e.message });
        });
      })

      const userRepository = getRepository(User);

      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const token = crypto.randomBytes(20).toString('hex');

      const now = new Date();
      now.setHours(now.getHours() + 1);

      await userRepository.update(user.id, {
        password_reset_token: token,
        password_reset_expires: now,
      });

      mailer.sendMail({
        to: email,
        from: 'elyte.show@gmail.com',
        template: 'auth/forgotPassword',
        context: { token },
      }, (err => {
        if (err) {
          console.log(err);
          return res.status(400).json({ error: 'Cannot send forgot email password' })
        }
        return res.send();
      }))

    } catch (err) {
      console.log('ERRO', err);
      res.status(400).json({ error: 'Error on forgot password, try again' });
    }
  },

  async reset(req: Request, res: Response) {
    try {
      const { email, token, password } = req.body;

      const schema = Yup.object().shape({
        email: Yup.string().required(),
        token: Yup.string().required(),
        password: Yup.string().required(),
      });

      await schema.validate({ email, token, password }, { abortEarly: false, }).catch(function (err) {
        err.inner.forEach((e: { message: any; }) => {
          return res.status(400).json({ error: e.message });
        });
      })

      const userRepository = getRepository(User);

      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      if(token !== user.password_reset_token){
        return res.status(400).json({ error: "Token invalid" });
      }

      const now = new Date();

      if(now > user.password_reset_expires){
        return res.status(400).json({ error: "Token expired, generate a new one" });
      }

      user.password = password;

      await user.save();

    } catch (err) {
      return res.status(400).json({ error: 'Cannot send reset password' })
    }
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail(id);

    return res.json(usersView.render(user));
  },

  async index(req: Request, res: Response) {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find();

    return res.json(usersView.renderMany(users));
  },

  async create(req: Request, res: Response) {
    const { name, email, password, admin } = req.body;

    const hashedPassword: string = await PasswordHash.hash(password);

    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne({ where: { email } });

    if (!userExists) {
      const data = {
        name,
        email,
        password: hashedPassword,
      };

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const user = await userRepository.create(data);

      await userRepository.save(user);
      return res.status(200).json({ password: undefined, msg: 'User registred' });
    }

    return res.status(409).json({ error: 'User already exists' });
  },

  async update(req: Request, res: Response) {
    const {
      id,
      name,
      email,
      password
    } = req.body;

    const schema = Yup.object().shape({
      id: Yup.string().required(),
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    await schema.validate({ id, name, email }, { abortEarly: false, }).catch(function (err) {
      err.inner.forEach((e: { message: any; }) => {
        return res.status(400).json({ error: e.message });
      });
    })

    const userRepository = getRepository(User);

    const user = await userRepository.findOne(id);

    const hashedPassword: string = await PasswordHash.hash(password);

    if (!user) {
      return res.status(400).json({ error: 'Update error' });
    } else {
      await userRepository.update(
        { id },
        {
          name,
          email,
          password: (password === '') ? user?.password : hashedPassword
        }
      );

      return res.status(201).json({ message: `User ${name} updated` });
    }

  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail(id);

    userRepository.delete(user);

    return res.status(200).json({ message: 'User deleted' });
  },
};

