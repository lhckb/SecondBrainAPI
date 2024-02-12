import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export default class AuthService {

  private SALT_ROUNDS = 10;
  private PRIVATE_KEY = "sbwoh2983yhwcfvç~gdfnabeuo";  // this shoud obviously not be here

  public hashPassword(password: string): string {
    return bcrypt.hashSync(password, this.SALT_ROUNDS);
  }

  public comparePassword(password, hashPassword) {
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
