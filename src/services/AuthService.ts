import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export default class AuthService {

  private SALT_ROUNDS: number = 10;
  public PRIVATE_KEY: string = process.env["SECRET_KEY"];  // this shoud obviously not be here

  public hashPassword(password: string): string {
    return bcrypt.hashSync(password, this.SALT_ROUNDS);
  }

  public comparePassword(password, hashPassword): boolean {
    return bcrypt.compareSync(password, hashPassword);
  }

  public generateToken(user: User): string {
    return jwt.sign(
      { user: JSON.stringify(user) },
      this.PRIVATE_KEY,
      { expiresIn: "1d" }
    );
  }
}
