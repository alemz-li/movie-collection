import { NextFunction, Request, Response } from "express";
import * as movieCollectionService from "../services/collection.service";
import { CollectionQuerySchemaType } from "../schemas/collection.schema";

export const getMovieHandler = async (
  req: Request<
    Record<string, never>,
    Record<string, never>,
    Record<string, never>,
    CollectionQuerySchemaType
  >,
  res: Response,
  next: NextFunction,
) => {
  const page = parseInt(req.query.page!) || 1;
  const limit = parseInt(req.query.limit!) || 10;
  const sort = req.query.sort || "alphabetical";
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const movies = await movieCollectionService.getMovies({
      limit,
      sort,
      startIndex,
    });

    res.send(movies);
    res.json({
      results: movies,
      info: {
        pages: movies.totalPages,
        hasNextPage: endIndex < movies.length,
        hasPreviousPage: startIndex > 0,
        limit,
      },
    });
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
