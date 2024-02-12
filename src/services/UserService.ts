import UserDAO from "../DAOs/UserDAO";
import * as EmailValidator from 'email-validator';
import EmailFormatNotAcceptedException from "../exceptions/EmailFormatNotAcceptedException";
import PasswordFormatNotAcceptedException from "../exceptions/PasswordFormatNotAccepted";
import UserDTO from "../DTOs/UserDTO";
import EmailAlreadyExistsException from "../exceptions/EmailAlreadyExistsException";
import UserNotFoundException from "../exceptions/UserNotFoundException";
import AuthService from "./AuthService";
import { User } from "@prisma/client";

export default class UserService {

  public async createUser({ first_name, last_name, email, password }): Promise<UserDTO> {
    const userDAO = new UserDAO();
    const authService = new AuthService();

    // upper, lower, special and minimum 10 chars
    const passwordRegex: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/;

    if (!passwordRegex.test(password)) {
      throw new PasswordFormatNotAcceptedException();
    }

    if (!EmailValidator.validate(email)) {
      throw new EmailFormatNotAcceptedException();
    }

    if(!userDAO.getUserByEmail(email) === null) {
      throw new EmailAlreadyExistsException();
    }

    const hashedPassword = authService.hashPassword(password);

    const userCreated = await userDAO.createUser({ first_name, last_name, email, password: hashedPassword });
    return UserDTO.modelToDTO(userCreated);
  }

  public async getUserModelByEmail(email: string): Promise<User> {
    const userDAO = new UserDAO();

    const user = await userDAO.getUserByEmail(email);
    if (user === null) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
