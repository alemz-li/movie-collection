import axios from 'axios'

const adminAPI = axios.create({
  baseURL: '/api/collection',
})

export const addMovie = async (movie) => {
  const { data } = await adminAPI.post('/', movie, {
    headers: { 'Content-Type': 'application/json' },
  })
  return data
}
