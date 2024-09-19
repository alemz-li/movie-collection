import {useNavigate} from 'react-router-dom'
import {logout} from '../api/auth'
import useAuth from '../hooks/useAuth'

const Logout = () => {
  const { setIsAuth } = useAuth() 
  const navigate = useNavigate()
  
  const handleLogout = async (ev) => {
    ev.preventDefault()

    await logout()
    setIsAuth(false)
    navigate('/')
  }

  return (
    <button onClick={handleLogout} className="btn-simple">Log Out</button>
  )
}

export default Logout
