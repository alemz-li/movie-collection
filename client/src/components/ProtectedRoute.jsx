
import { useEffect, useState, } from 'react'
import { useLocation, Navigate, Outlet, } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const ProtectedRouted = () => {
  const { isAuth, setIsAuth } = useAuth()
  const [hasCookie, setHasCookie ] = useState(false)
  const location = useLocation()
  console.log('hasCookies')
  console.log('isAuth', isAuth)
  
  // check has cookie
  useEffect(() => {
        const checkCookie = async () => {
          console.log('hastoken running...')
          try {
            const resp =await axios.get('http://localhost:5000/api/auth/check', {
              withCredentials: true,
            }) 
            
            console.log(resp)
            setHasCookie(true)
            setIsAuth(true)
            console.log('persist?, isauth', isAuth)
          } catch (error) {
            return <Navigate to="/login" state={{ from: location }} replace />
          }
        }

        checkCookie()
  },[])


  return hasCookie ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default ProtectedRouted
