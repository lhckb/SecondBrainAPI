import { Request, Response } from "express";
import UserDAO from "../DAOs/UserDAO";
import UserService from "../services/UserService";
import UserDTO from "../DTOs/UserDTO";
import PasswordFormatNotAcceptedException from "../exceptions/PasswordFormatNotAccepted";
import EmailFormatNotAcceptedException from "../exceptions/EmailFormatNotAcceptedException";
import EmailAlreadyExistsException from "../exceptions/EmailAlreadyExistsException";

const userService: UserService = new UserService();
export default class UserController {

  // public async getUser(req: Request, res: Response) {
  //   const userDAO = new UserDAO();
  //   let reqId: string = req.params["id"];

  //   try {
  //     const user = await userDAO.getUserById(reqId);
  //     res.status(200).json({ data: user });
  //   }
  //   catch(error) {
  //     res.status(422).json({ message: error.message });
  //   }
  // }

  public async postUser(req: Request, res: Response) {
    let reqBody = req.body;

    try {
      const userCreated: UserDTO = await userService.createUser(reqBody);
      res.status(201).json({ data: userCreated });
    }
    catch(error) {
      // I REALLY dont like this
      switch (true) {
        case error instanceof PasswordFormatNotAcceptedException:
          res.status(403).json({ message: error.message });
          break;
        
        case error instanceof EmailFormatNotAcceptedException:
          res.status(403).json({ message: error.message });
          break;

        case error instanceof EmailAlreadyExistsException:
          res.status(403).json({ message: error.message });
          break;
      
        default:
          res.status(500).json({ message: error.message });
          break;
      }
    }
  }
}
