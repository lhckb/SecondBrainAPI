import { Express } from "express";
import UserController from "../controllers/UserController";
import AuthMiddleware from "../middleware/AuthMiddleware";

const userController = new UserController();
const authMiddleware = new AuthMiddleware();

export default class UserRouter { 

  public mapRoutes(app: Express): void {
    app.get("/users/", authMiddleware.verifyToken, userController.getUsers);
    app.post('/user', userController.postUser);
  }
}
