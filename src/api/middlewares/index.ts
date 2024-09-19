import { NextFunction, Request, Response } from "express";
import type { ErrorResponse, RequestValidator } from "../../types/types";
import { ZodError } from "zod";

export const validateRequest = (validators: RequestValidator) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params);
      }
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }
      if (validators.query) {
        req.query = await validators.query.parseAsync(req.query);
      }
      next();
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        res.status(422);
      }
      next(error);
    }
  };
};

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction,
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  const message =
    err instanceof ZodError
      ? err.errors.map((issue) => issue.message)
      : err.message;

  res.json({
    message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}
