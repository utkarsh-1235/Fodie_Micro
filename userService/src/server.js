// src/server.ts
import dotenv from 'dotenv';
import { app } from './app';
import { connectToDB } from './db';

dotenv.config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  await connectToDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
