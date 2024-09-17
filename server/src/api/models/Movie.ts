import { Schema, model, Document } from "mongoose";

export const MOVIE_TYPES = ["Movie", "TV Show"] as const;
export type MovieType = (typeof MOVIE_TYPES)[number];

export const MOVIE_FORMATS = ["DVD", "Blu-ray", "4K UHD"] as const;
export type MovieFormat = (typeof MOVIE_FORMATS)[number];

interface IMovie extends Document {
  title: string;
  type: MovieType;
  format: MovieFormat;
  watched: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const movieSchema = new Schema<IMovie>(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: MOVIE_TYPES,
      required: true,
    },
    format: {
      type: String,
      enum: MOVIE_FORMATS,
      required: true,
    },
    watched: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

movieSchema.index({ title: 1, type: 1 });

export default model<IMovie>("Movie", movieSchema);
