import {Link} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Nav = () => {
  const { isAuth } = useAuth()
  
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/collection">Collection</Link></li>
        <li><Link to="/about">About</Link></li>
        {isAuth && <li><Link to='/admin'>Admin</Link></li>}
      </ul>
    </nav>
  )
}

export default Nav
