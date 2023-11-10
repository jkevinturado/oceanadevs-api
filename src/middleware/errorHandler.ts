import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../helpers/errors/customError';

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    const { statusCode, errors, logging } = error;
    console.log(`Handled Error:`);
    if (logging) {
      console.error(
        JSON.stringify(
          {
            code: error.statusCode,
            errors: error.errors,
            stack: error.stack,
          },
          null,
          2
        )
      );
    }

    return res.status(statusCode).send({ errors });
  }

  // Unhandled errors
  console.log(`Unhandled Error:`);
  console.error(JSON.stringify(error, null, 2));
  return res
    .status(500)
    .send({ errors: [{ message: 'Something went wrong' }] });
};

export default errorHandler;
