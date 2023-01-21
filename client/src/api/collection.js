import axios from 'axios'

const collectionAPI = axios.create({
  baseURL: '/api/collection',
})

export const getMovies = async (page = 1, limit = 10, sort = 'recent') => {
  const { data } = await collectionAPI.get(
    `?page=${page}&limit=${limit}&sort=${sort}`
  )
  return data
}

export const getCollectionInfo = async () => {
  const { data } = await collectionAPI.get('/info')
  
  return data
}

export const getRecent = async () => {
  const { data } = await collectionAPI.get('/recent')

  return data
}

export const addMovie = async (movie) => {
  const { data } = await collectionAPI.post('/', movie, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  })
  return data
}

export const updateMovie = async (movieObj) => {
  const { movie_id: movieId, movie} = movieObj
  const {data} = await collectionAPI.put(`/${movieId}`, movie, {
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true,
  })
  return data
}

export const deleteMovie = async (movieId) => {
  const { data } = await collectionAPI.delete(`/${movieId}`, {
    withCredentials: true,
  })
  return data
}

export const getMovieById = async (movieId) => {
  const { data } = await collectionAPI.get(`/movie/${movieId}`, {
    withCredentials: true
  })
  return data
}
