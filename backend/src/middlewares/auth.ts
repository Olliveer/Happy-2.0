import { Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from '../../config/auth';

interface Token {
  id: string;
  iat: number;
  exp: number;
}

export default function auth(req: Request, res: any, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "No token provided" });
  }

  const [scheme, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { id } = decoded as Token;

    req.user = {
      id,
    }

    return next();
  } catch (err) {
    return res.status(401).send({ error: "Token invalid"});
  }
};

