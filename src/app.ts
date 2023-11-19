import express, { json } from 'express';
import UserRouter from './router/UserRoutes';

const app = express();
app.use(json());
const port = 3000;
const userRouter = new UserRouter();

userRouter.mapRoutes(app);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});