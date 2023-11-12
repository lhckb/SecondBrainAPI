import { Express } from "express";

export default class UserRouter {
  private readonly baseURL: string = "/user"

  public mapRoutes(app: Express): void {

    app.get(`${this.baseURL}/:id`, (req, res) => {
      let reqId: string = req.params["id"];

      res.status(200).json({ message: reqId });
    });

  }
}