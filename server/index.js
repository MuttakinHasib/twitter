import './env.js';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import connectDB from './configs/connectDB.js';
import userRoutes from './routes/userRoutes.js';
import tweetRoutes from './routes/tweetRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler, notFound } from './middlewares/error.js';

// Config DotEnv

// Connect MongoDB
connectDB();

const app = express();
// Port
const port = process.env.PORT || 5000;

// Bypass cors
app.use(cors());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Routes
app.use('/api/user', userRoutes);
app.use('/api/tweet', tweetRoutes);
app.use('/api/upload', uploadRoutes);

// Error Handler
app.use(notFound);
app.use(errorHandler);

// Log Server Connection
app.listen(port, () => console.log(`Server running on port: ${port}`));
