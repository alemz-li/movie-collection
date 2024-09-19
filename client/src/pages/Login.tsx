import { useMutation } from '@tanstack/react-query'
import { login } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import Toast from '../components/Toast'

const Login = () => {
  const [error, setError] = useState('')
  const { setIsAuth } = useAuth()
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      setIsAuth(true)
      navigate('/admin')
    },
    onError: (error) =>{
      setError(error.response.data?.message)
    }
  })

  const handleSubmit = (ev) => {
    ev.preventDefault()

    setError('')
    const formData = new FormData(ev.target)
    const loginDetails = Object.fromEntries(formData)

    loginMutation.mutate(loginDetails)
  }

  return (
    <>
    {error && <Toast status='error' message={error} />}
    <form className="login__form" onSubmit={handleSubmit}>
      <div className="form__group">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" />
      </div>
      <div className="form__group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
      </div>
      <button className='btn primary' type="submit">Log in</button>
    </form>
    </>
  )
}

export default Login
