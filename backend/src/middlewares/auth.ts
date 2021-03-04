import { NextFunction, Request } from "express";
import { AppError } from "../errors/AppError";
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

interface Token {
  id: string;
  iat: number;
  exp: number;
}

export default function auth(req: Request, res: any, next: NextFunction): void {
  const authHeader: string | undefined = req.headers.authorization;
  console.log('AUTORIZATION -> ', authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const verified = jwt.verify(token, authConfig.jwt.secret);
    req.user = verified;

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT!', 400);
  }
};

