import express, { json } from 'express';
import UserRouter from './router/UserRoutes';
import AuthRouter from './router/AuthRouter';

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