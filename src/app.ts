import express, { json } from 'express';
import UserRouter from './router/UserRouter';
import AuthRouter from './router/AuthRouter';
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env" });
} 
else if (fs.existsSync(".env.dev")) {
  dotenv.config({ path: ".env.dev" });
}

if (!process.env.SECRET_KEY) {
    console.error("No Secret Key supplied in .env file.");
    process.exit(1);
}

console.log("Env loaded successfully");
// console.log(`ENV ${process.env.ENVIRONMENT} | SECRET ${process.env.SECRET_KEY}`);

const app = express();
app.use(json());
const port = 3000;

const userRouter = new UserRouter();
const authRouter = new AuthRouter();

userRouter.mapRoutes(app);
authRouter.mapRoutes(app);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});