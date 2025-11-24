import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Routes will be added here
app.get('/', (req, res) => {
  res.send('Campus Sync API is running');
});

export default app;
