import Movie, { MovieFormat } from "../models/Movie";
import type {
  CreateMovieInput,
  PatchMovieInput,
} from "../schemas/collection.schema";

const getTotalMovies = async () => {
  return await Movie.countDocuments().exec();
};

export const addMovie = async (movie: CreateMovieInput) => {
  return await Movie.create(movie);
};

export const getMovies = async ({
  limit,
  sort,
  startIndex,
}: {
  limit: number;
  sort: "recent" | "alphabetical";
  startIndex: number;
}) => {
  const movies = await Movie.find()
    .limit(limit)
    .skip(startIndex)
    .select("-createdAt -updatedAt")
    .sort(sort === "alphabetical" ? { title: 1 } : { createdAt: -1 })
    .exec();

  return movies;
};

export const getMovieById = async (id: string) => {
  return await Movie.findById(id);
};

export const updateMovie = async (id: string, movie: PatchMovieInput) => {
  return await Movie.findByIdAndUpdate(id, movie, { new: true });
};

export const deleteMovie = async (id: string) => {
  return await Movie.findByIdAndDelete(id);
};

export const collectionInfo = async () => {
  const movieFormatCounts: {
    _id: MovieFormat;
    count: number;
  }[] = [
    { _id: "DVD", count: await Movie.countDocuments({ format: "DVD" }) },
    {
      _id: "Blu-ray",
      count: await Movie.countDocuments({ format: "Blu-ray" }),
    },
    { _id: "4K UHD", count: await Movie.countDocuments({ format: "4K UHD" }) },
  ];

  const totalMovies = await getTotalMovies();

  return {
    formats: movieFormatCounts,
    total: totalMovies,
  };
};

export const recentlyAdded = async (limit: number = 5) => {
  return await Movie.find().sort({ createdAt: -1 }).limit(limit).exec();
};
