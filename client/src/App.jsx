import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import CheckIsAuth from './components/CheckIsAuth'
import Nav from './components/Nav'
import CollectionPage from './pages/CollectionPage'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Login from './pages/Login'
import MoviePage from './pages/MoviePage'
import About from './pages/About'
// import ProtectedRouted from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <main className="wrapper">
      <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/collection" element={<CollectionPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path='/about' element={<About />}></Route>
          {/* Protected */}
            <Route element={<CheckIsAuth />}>
              <Route path="/admin" element={<Admin />}></Route>
              <Route path="/admin/movie/:id" element={<MoviePage />}></Route>
            </ Route>
          <Route path='*' element={<Navigate to='/' />}></Route> 
        </Routes>
      </main>
    </Router>
  )
}

export default App
