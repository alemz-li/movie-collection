import allowedOrigins from './allowedOrigins.js'

const corsOptions = {
  origin: (origin, callback) => {
    // remove second condition to not allow applications like POSTMAN to make requests
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
}

export default corsOptions
