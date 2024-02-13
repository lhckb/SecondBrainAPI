import { Request, Response } from 'express';
import jwt from "jsonwebtoken";

export default class AuthMiddleware {

  public verifyToken(
    req: Request, 
    res: Response, 
    next: () => Promise<void>
  ): Promise<void> {
    const token: string = req.headers.authorization?.split(' ')[1] || ' ';

    if (token.length <= 1) {
      res.status(401).json({ message: "No valid token provided." });
    }

    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      const userPresentInToken = typeof payload !== 'string' && payload['user'];
  
      if (!userPresentInToken) {
        res.send(401).json({ message: "Token invalid." });
      }
  
      req.headers['user'] = payload['user'];
  
      return next();
    }
    catch (error) {
      res.status(500).json({ message: error.message });  // dont leave this here obviously
    }
  }
}