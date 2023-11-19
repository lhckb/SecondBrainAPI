import UserDAO from "../DAOs/UserDAO";
import * as EmailValidator from 'email-validator';
import EmailFormatNotAcceptedException from "../exceptions/EmailFormatNotAcceptedException";
import PasswordFormatNotAcceptedException from "../exceptions/PasswordFormatNotAccepted";
import bcrypt from 'bcrypt';
import { User } from "@prisma/client";
import UserDTO from "../DTOs/UserDTO";
import EmailAlreadyExistsException from "../exceptions/EmailAlreadyExistsException";

export default class UserService {

  public async createUser({ first_name, last_name, email, password }): Promise<UserDTO> {
    const userDAO = new UserDAO();

    // upper, lower, special and minimum 10 chars
    const passwordRegex: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/

    if (!passwordRegex.test(password)) {
      throw new PasswordFormatNotAcceptedException();
    }

    if (!EmailValidator.validate(email)) {
      throw new EmailFormatNotAcceptedException();
    }

    if(userDAO.getUserByEmail(email) !== null) {
      throw new EmailAlreadyExistsException();
    }

    const SALT_ROUNDS = 10;
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    try {
      const userCreated = await userDAO.createUser({ first_name, last_name, email, password: hashedPassword });
      return UserDTO.modelToDTO(userCreated);
    }
    catch(error) {
      throw error;
    }
  }
}
