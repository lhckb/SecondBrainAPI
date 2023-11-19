import { Express } from "express";
import UserController from "../controllers/UserController";

const userController = new UserController();

export default class AuthRouter { 

  public mapRoutes(app: Express): void {
    // app.get("/user/:id", this.userController.getUser);
    app.post('/user', userController.postUser);
  }
}
