import { describe, expect, test } from '@jest/globals';
import AuthService from '../AuthService';
import bcrypt from "bcrypt";

const authService = new AuthService();

describe('Auth Service tests', () => {
  test('should validate password correctly', () => {
    const rounds = parseInt(process.env.SALT_ROUNDS!);
    const password = "@julianCasablancas1984";

    const hashedPassword = bcrypt.hashSync(password, rounds);

    expect(authService.comparePassword(password, hashedPassword)).toBeTruthy();
  });
});