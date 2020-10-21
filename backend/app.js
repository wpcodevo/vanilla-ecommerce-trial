import express from 'express';
import morgan from 'morgan';

import connectDB from './config/db';
import AppError from './modules/utils/error/appError';

const app = express();

// Connect To Database
connectDB();

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware

// Routes

// Unhandled Routes
app.all('*', (req, res, next) => {
  return next(
    new AppError(`Cannot find ${req.originalUrl} on this server`, 404)
  );
});

// Global Error  Handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
