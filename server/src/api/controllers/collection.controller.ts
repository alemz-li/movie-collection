import { NextFunction, Request, Response } from "express";
import * as movieCollectionService from "../services/collection.service";

export const getMovieHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  /*
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort || "recent";
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const query = req.query;
  */

  try {
    const movies = await movieCollectionService.getMovies();

    res.send(movies);
    /*
    res.json({
      results: movies,
      info: {
        pages: totalPages,
        hasNextPage: endIndex < movies.length,
        hasPreviousPage: startIndex > 0,
        limit,
      },
    });
    */
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const addMovieHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movie = await movieCollectionService.addMovie(req.body);

    res.status(201).send(movie);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateMovieHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movie = await movieCollectionService.updateMovie(
      req.params.id,
      req.body,
    );

    res.send(movie);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteMovieHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movie = await movieCollectionService.deleteMovie(req.params.id);

    res.status(200).send(movie);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const recentlyAddedHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movies = await movieCollectionService.recentlyAdded(5);

    res.send(movies);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const collectionInfoHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const info = await movieCollectionService.collectionInfo();

    res.send(info);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getMovieByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movie = await movieCollectionService.getMovieById(req.params.id);

    res.send(movie);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
