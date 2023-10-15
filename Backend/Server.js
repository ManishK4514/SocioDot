import express from 'express';
import cors from 'cors';
import { connection } from './database/db.js';
import { userRouter } from './routes/user.route.js'; 
import { postRouter } from './routes/post.route.js'; 
import { authRouter } from "./routes/auth.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/post', postRouter); 
app.use("/auth", authRouter);

app.get('/', (req, res) => {
  res.send({
    message: 'API is working now',
  });
});

app.listen(PORT, async () => {
  try {
    await connection;
  } catch (error) {
    console.log(error);
  }
  console.log(`Listening on port: ${PORT}`);
});