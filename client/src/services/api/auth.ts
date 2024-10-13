import axios from 'axios'

const authAPI = axios.create({
  baseURL: '/api/auth',
})

export const login = async (loginDetails) => {
  const { data } = await authAPI.post('/login', loginDetails, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  })
  return data
}

export const checkToken = async () => {
  const { data } = await authAPI.get('/check', {
    withCredentials: true
  })
  return data
}

export const logout = async () => {
  const { data } = await authAPI.get('/logout', {
    withCredentials: true
  })
  return data
}
