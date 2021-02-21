import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate, AfterLoad, BeforeInsert, InsertEvent, UpdateEvent } from "typeorm";
import PasswordHash from "../utils/passwordHash";

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

  @Column({ nullable: true })
  password_reset_token: string;

  @Column({ nullable: true })
  password_reset_expires: Date;

  // private tempPassword: string;

  // @AfterLoad()
  // private loadTempPassword(): void {
  //   this.tempPassword = this.password;
  // }

  // @BeforeInsert()
  // @BeforeUpdate()
  // async hashPassword(): Promise<void> {
  //   // cheack if that password changing or not
  //   if (this.password) {
  //     if (this.tempPassword !== this.password) {
  //       try {
  //         this.password = await PasswordHash.hash(this.password);
  //       } catch (e) {

  //         throw new Error('there are some issiue in the hash');
  //       }
  //     }
  //   }
  // }

  generateToken(): string {
    const { secret, expiresIn } = authConfig.jwt;

    return sign({ id: this.id }, secret, {
      expiresIn,
    });
  }
}

