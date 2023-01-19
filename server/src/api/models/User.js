import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    owner: { type: Boolean },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default model('User', userSchema)
