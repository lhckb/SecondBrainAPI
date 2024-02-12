import { Express } from "express";
import UserController from "../controllers/UserController";

const userController = new UserController();

export default class UserRouter { 

  public mapRoutes(app: Express): void {
    app.get("/user/:id", userController.getUser);
    app.post('/user', userController.postUser);
  }
}
