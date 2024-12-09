import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = (err as any).status || 500;
  const errorResponse = {
    message: err.message,
    error:
      process.env.NODE_ENV === "development" ? err : "Internal Server Error",
  };

  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }

  res.status(statusCode).json({ error: errorResponse });
};

export default errorMiddleware;
