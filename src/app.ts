import "reflect-metadata";
import express, { NextFunction, Request, Response, response } from 'express';
import 'express-async-errors';
import { router } from './routes';
import cors from 'cors';

import './database';
import './shared/container';
import createConnection from "../src/database/index";
import { AppError } from './shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', router);

createConnection();

app.use(
  (err: Error, request: express.Request, response: express.Response, _next: express.NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message} `,
    });
  }
);

export { app };
