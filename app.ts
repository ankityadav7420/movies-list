// src/app.ts
import express from 'express';
import connectDB from './utils/db';
import bodyParser from 'body-parser';

import movieRoutes from "./src/routes/movieRoutes"
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use(bodyParser.json());
app.use('/api', movieRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
