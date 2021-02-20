import { Request, Response } from "express";
import User from "../models/User";
import PasswordHash from "../utils/passwordHash";
import usersView from "../views/users_view";
import * as Yup from "yup";
import { getRepository } from "typeorm";

export default {
  async authenticate(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const schema = Yup.object().shape({
        email: Yup.string().required(),
        password: Yup.string().required(),
      });

      await schema.validate({ email, password }, { abortEarly: false, }).catch(function (err) {
        err.inner.forEach(e => {
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
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('E-mail is required'),
        password: Yup.string().required('Password is required'),
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

  // ADICIONAR YUP VALIDATION
  async update(req: Request, res: Response) {
    const {
      id,
      name,
      email,
      password
    } = req.body;

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

