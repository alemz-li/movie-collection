import { z } from "zod";

export const MOVIE_TYPES = ["Movie", "TV Show"] as const;
export type MovieType = (typeof MOVIE_TYPES)[number];

export const MOVIE_FORMATS = ["DVD", "Blu-ray", "4K UHD"] as const;
export type MovieFormat = (typeof MOVIE_FORMATS)[number];

export const createMovieSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  type: z.enum(MOVIE_TYPES, { message: "Media type is required" }),
  format: z.enum(MOVIE_FORMATS, { message: "Media format is required" }),
  watched: z.boolean().optional().default(false),
});

export type CreateMovieSchemaType = z.infer<typeof createMovieSchema>;
