import { NextFunction, Request, Response } from "express";
import Movie from "../models/Movie.js";

export const isDuplicate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, format } = req.body;

  const inCollection = await Movie.findOne({ title, format });

  if (inCollection) {
    res.status(409);
    throw new Error("Already in collection");
  }

  next();
};
