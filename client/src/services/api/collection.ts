import { type CollectionInfo, type Movie } from "../../types/collection";
import axios from "./axios";

export const getMovies = async (page = 1, limit = 10, sort = "recent") => {
  const { data } = await axios.get<Movie[]>(
    `?page=${page}&limit=${limit}&sort=${sort}`,
  );
  return data as Movie[];
};

export const getCollectionInfo = async () => {
  const { data } = await axios.get<CollectionInfo>("/collection/info");

  return data;
};

export const getRecent = async () => {
  const { data } = await axios.get("/recent");

  return data;
};

export const addMovie = async (movie) => {
  const { data } = await axios.post("/", movie, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  return data;
};

export const updateMovie = async (movieObj) => {
  const { movie_id: movieId, movie } = movieObj;
  const { data } = await axios.put(`/${movieId}`, movie, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return data;
};

export const deleteMovie = async (movieId: string) => {
  const { data } = await axios.delete(`/${movieId}`, {
    withCredentials: true,
  });
  return data;
};

export const getMovieById = async (movieId: string) => {
  const { data } = await axios.get(`/movie/${movieId}`, {
    withCredentials: true,
  });
  return data;
};
