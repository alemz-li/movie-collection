import { z } from "zod";
import { MOVIE_FORMATS, MOVIE_TYPES } from "../models/Movie";

export const createMovieSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  type: z.enum(MOVIE_TYPES, { message: "Media type is required" }),
  format: z.enum(MOVIE_FORMATS, { message: "Media format is required" }),
  watched: z.boolean().optional().default(false),
});

export const patchMovieSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).optional(),
  type: z.enum(MOVIE_TYPES).optional(),
  format: z.enum(MOVIE_FORMATS).optional(),
  watched: z.boolean().optional(),
});

export const collectionQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional().default("10"),
  sort: z.enum(["recent", "alphabetical"]).default("alphabetical").optional(),
});

export type CreateMovieInput = z.infer<typeof createMovieSchema>;
export type PatchMovieInput = z.infer<typeof patchMovieSchema>;
export type CollectionQuerySchemaType = z.infer<typeof collectionQuerySchema>;
