import { Schema, model } from 'mongoose'

export const MOVIE_TYPES = ['Movie', 'TV Show']
export const MOVIE_FORMATS = ['DVD', 'Blu-ray', '4K UHD']

const movieSchema = new Schema(
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
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default model('Movie', movieSchema)
