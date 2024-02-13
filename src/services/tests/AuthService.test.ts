import { describe, expect, test } from '@jest/globals';
import AuthService from '../AuthService';
import bcrypt, { hash } from "bcrypt";

const authService = new AuthService();

describe('Auth Service tests', () => {

  test('should validate password correctly', () => {
    const rounds = parseInt(process.env.SALT_ROUNDS!);
    const password = "@julianCasablancas1984";

    const hashedPassword = bcrypt.hashSync(password, rounds);

    expect(authService.comparePassword(password, hashedPassword)).toBeTruthy();
  });

  test('should not validate password different from one hashed', () => {
    const rounds = parseInt(process.env.SALT_ROUNDS!);
    const password = "@julianCasablancas1984";
    const differentPassword = "@julianCasablancas1987";

    const hashedPassword = bcrypt.hashSync(password, rounds);

    expect(authService.comparePassword(differentPassword, hashedPassword)).toBeFalsy();
  });

  test('should hash password successfully', () => {
    const password = "@julianCasablancas1984";

    const hashedPassword = authService.hashPassword(password);

    expect(hashedPassword.length > 0).toBeTruthy();
    expect(typeof hashedPassword === "string").toBeTruthy();
    expect(bcrypt.compareSync(password, hashedPassword)).toBeTruthy();
  });

  test('aaa', () => {
    const password = "";
    const hashedPassword = authService.hashPassword(password);
    console.log(hashedPassword)

    const password2 = " ";
    const hashedPassword2 = authService.hashPassword(password);
    console.log(hashedPassword2)
  });

});