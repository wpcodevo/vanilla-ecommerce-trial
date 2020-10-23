import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import connectDB from './config/db';
import AppError from './modules/utils/error/appError';
import data from './data';

const app = express();

// Connect To Database
connectDB();

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware
app.use(cors());

// Routes
app.get('/api/products', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    products: data.products,
  });
});

app.get('/api/products/:id', (req, res, next) => {
  const { products } = data;
  const { id } = req.params;

  const product = products.find((item) => item._id === parseInt(id, 10));

  if (!product) {
    return res.status(404).json({
      status: 'fail',
      message: 'No product found with this ID',
    });
  }

  res.status(200).json({
    status: 'success',
    product,
  });
});

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
