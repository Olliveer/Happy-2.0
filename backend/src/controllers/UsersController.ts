import { Request, Response } from "express";
import User from "../models/User";
import PasswordHash from "../utils/passwordHash";
import usersView from "../views/users_view";
import * as Yup from "yup";
import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanage";

export default {
  async authenticate(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const schema = Yup.object().shape({
        email: Yup.string().required(),
        password: Yup.string().required(),
      });

      await schema.validate({
        email, password
      },
        {
          abortEarly: false,
        }
      );

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
      return res.status(400).json({ error: 'User authentication failed', err })
    }
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail(id);

    return res.json(usersView.render(user));
  },

  // async index(req: Request, res: Response) {
  //   const usersRepository = getRepository(Users);

  //   const users = await usersRepository.find();

  //   return res.json(usersView.render(users));
  // },

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

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
        name: Yup.string().required("Campo nome vazio"),
        email: Yup.string().required(),
        password: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const user = await userRepository.create(data);

      await userRepository.save(user);
      return res.status(201).json({ ...user, password: undefined });
    }

    return res.status(409).send({ error: "User already exists" });
  },
};
