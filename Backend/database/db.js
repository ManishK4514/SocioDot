import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connection = mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected To MongoDB'))
  .catch((err) => console.log(err));

export { connection };