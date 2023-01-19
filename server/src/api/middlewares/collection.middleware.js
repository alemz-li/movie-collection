import Movie from '../models/Movie.js'

export const hasRequiredValues = async (req, res, next) => {
  const { title, format, type } = req.body
  if (!title || !format || !type)
    return res.status(400).json({ message: 'Missing information' })

  next()
}

export const isDuplicate = async (req, res, next) => {
  const { title, format } = req.body

  const inCollection = await Movie.findOne({ title, format })

  if (inCollection)
    return res.status(409).json({ message: 'Already in collection' })

  next()
}
