import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import corsOptions from './config/corsOptions.js'
import cookieParser from 'cookie-parser'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
dotenv.config()

import collectionRoutes from './api/routes/collection.routes.js'
import authRoutes from './api/routes/auth.routes.js'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

// Frontend
app.use(express.static(join(__dirname, '../../client/dist')))

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
  res.sendFile(join(__dirname, '../../client/dist/index.html'))
})

app.use('/api/collection', collectionRoutes)
app.use('/api/auth', authRoutes)

app.all('*', (_req, res) => {
  res.sendFile(join(__dirname, '../../client/dist/index.html'))
})
export default app
