import { Express } from "express";
import AuthController from "../controllers/AuthController";

const authController = new AuthController();

export default class AuthRouter { 

  public mapRoutes(app: Express): void {
    app.post('/login', authController.authenticate);
  }
}
