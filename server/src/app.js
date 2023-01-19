import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import corsOptions from './config/corsOptions.js'
import cookieParser from 'cookie-parser'
dotenv.config()

import collectionRoutes from './api/routes/collection.routes.js'
import authRoutes from './api/routes/auth.routes.js'

const app = express()

// Middlerwares
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
  // Cross Origin Resource Sharing
  app.use(cors(corsOptions))
}

app.use(helmet())
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))
// built-in middleware to receive json
app.use(express.json())
// middlware for cookies
app.use(cookieParser())

// Endpoints
app.get('/', (_req, res) => {
  res.json({message: 'Hello from the server'})
})

app.use('/api/collection', collectionRoutes)
app.use('/api/auth', authRoutes)

app.all('*', (_req, res) => {
  res.status(404).json({message: 'Not found'})
})
export default app
