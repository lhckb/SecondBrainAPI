import express from 'express';
import UserRouter from './router/userRoutes';

const app = express();
const port = 3000;
const userRouter = new UserRouter()

userRouter.mapRoutes(app);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});