import app from './app.js'
import connectDB from './config/db.js'
const PORT = process.env.PORT || 5000

try {
  connectDB()
  app.listen(PORT, console.log(`Server is listening on port ${PORT}`))
} catch (error) {
  console.log(error)
}
