import { Request, Response } from "express";
import UserDAO from "../DAOs/UserDAO";
import UserService from "../services/UserService";
import UserDTO from "../DTOs/UserDTO";
import SecondBrainApplicationError from "../exceptions/SecondBrainApplicationError";
import IncorrectPasswordException from "../exceptions/IncorrectPasswordException";

const userService: UserService = new UserService();
export default class UserController {

  public async getUser(req: Request, res: Response) {
    const userDAO = new UserDAO();
    const reqId: string = req.params["id"];

    try {
      const user = await userDAO.getUserById(reqId);
      res.status(200).json({ data: user });
    }
    catch(error) {
      res.status(422).json({ message: error.message });
    }
  }

  public async postUser(req: Request, res: Response) {
    const reqBody = req.body;

    try {
      const userCreated: UserDTO = await userService.createUser(reqBody);
      res.status(201).json({ data: userCreated });
    }
    catch(error) {
      // I REALLY dont like this
      switch (true) {
        case error instanceof IncorrectPasswordException:
          res.status(401).json({ message: error.message });
          break;

        case error instanceof SecondBrainApplicationError:
          res.status(403).json({ message: error.message });
          break;
      
        default:
          // this cannot stay like this since debug errors might be shown to final user
          res.status(500).json({ message: error.message });
          break;
      }
    }
  }
}
