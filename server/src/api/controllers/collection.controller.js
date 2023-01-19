import Movie from '../models/Movie.js'

export const getMovies = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const sort = req.query.sort || 'recent'
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  try {
    const movies = await Movie.find()
      .limit(limit)
      .skip(startIndex)
      .select('-createdAt -updatedAt')
      .sort(sort === 'alphabetically' ? {title: 1} : {createdAt: -1})
      .exec()

    const totalMovies = await Movie.countDocuments().exec()

    const totalPages = Math.ceil(totalMovies / limit)

    res.json({
      results: movies,
      info: {
        total: totalMovies,
        pages: totalPages,
        hasNextPage: endIndex < totalMovies,
        hasPreviousPage: startIndex > 0,
        limit,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message})
  }
}

export const searchMovies = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const sort = req.query.sort || 'recent'
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const query = req.query

  try {
    const movies = await Movie.find(query)
      .limit(limit)
      .skip(startIndex)
      .select('-createdAt -updatedAt')
      .sort(sort === 'alphabetically' ? {title: 1} : {createdAt: -1})
      .exec()

    const totalPages = Math.ceil(movies.length / limit)

    res.json({
      results: movies,
      info: {
        pages: totalPages,
        hasNextPage: endIndex < movies.length,
        hasPreviousPage: startIndex > 0,
        limit,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message})
  }
}

export const addMovie = async (req, res) => {
  const movie = req.body

  try {
    const newMovie = new Movie(movie)

    const addedMovie = await newMovie.save()

    res.status(201).json(addedMovie)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message})
  }
}

export const updateMovie = async (req, res) => {
  try {
    const updateDetails = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(updateDetails)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message})
  }
}

export const removeMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id)

    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message})
  }
}

export const recentlyAdded = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 }).limit(5).exec()

    res.json(movies)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message})
  }
}

export const collectionInfo = async (req, res) => {
  try {
    const movieFormatCounts = [
      { _id: "DVD", count: await Movie.countDocuments({ format: 'DVD' })},
      { _id: "Blu-ray", count: await Movie.countDocuments({ format: 'Blu-ray' })},
      { _id: "4K UHD", count: await Movie.countDocuments({ format: '4K UHD' })}
    ]
    
    const totalMovies = await Movie.countDocuments()

    res.json({formats:movieFormatCounts, total: totalMovies})
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message})
  }
}

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id) 

    res.json(movie)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message})
  }
}
