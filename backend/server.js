import path from 'path';
import dotenv from 'dotenv';

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log(`UNCAUGHT EXCEPTION 🔥, Shouting down...`);
  process.exit(1);
});

dotenv.config({ path: path.join(__dirname, '/config/config.env') });

const app = require('./app');

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(
    `Server started successfully in ${process.env.NODE_ENV} on port: ${PORT}`
  );
});

process.on('unhandledRejection', (err) => {
  console.log(err.codeName);
  console.log(`UNHANDLED REJECTION 🔥, Shouting down...`);
  server(() => {
    process.exit(1);
  });
});
