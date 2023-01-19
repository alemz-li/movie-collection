import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((db) => console.log('db is connected'))
    .catch((error) => 'error:' + console.log(error))
}

export default connectDB
