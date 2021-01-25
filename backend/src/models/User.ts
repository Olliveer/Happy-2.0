import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import authConfig from '../config/auth';

import { sign } from "jsonwebtoken";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  generateToken(): string {
    const { secret, expiresIn } = authConfig.jwt;

    return sign({ id: this.id }, secret, {
      expiresIn,
    });
  }
}


