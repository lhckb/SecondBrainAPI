import { Request, Response } from "express";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";
import IncorrectPasswordException from "../exceptions/IncorrectPasswordException";
import SecondBrainApplicationError from "../exceptions/SecondBrainApplicationError";

export default class AuthController {
  public async authenticate(req: Request, res: Response): Promise<void> {
    const userService = new UserService();
    const authService = new AuthService();

    try {
      const { email, password } = req.body;
      const user = await userService.getUserModelByEmail(email);
  
      if (!authService.comparePassword(password, user.password)) {
        throw new IncorrectPasswordException();
      }

      const token = authService.generateToken(user);

      res.status(200).json({ token: token });
    }
    catch(error) {
      // i might just throw up at this point 
      switch (true) {
        case error instanceof SecondBrainApplicationError:
          res.status(403).json({ message: error.message });
          break;
        
        default:
          res.status(500).json({ message: error.message });
          break;
      }
    }
  }
}
