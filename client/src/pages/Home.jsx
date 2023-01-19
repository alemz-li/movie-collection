import { Link } from 'react-router-dom'
import CollectionInfo from '../components/CollectionInfo'
import RecentlyAdded from '../components/RecentlyAdded'

const Home = () => {
  return (
  <>
      <h1 className='text-center'>Welcome to Alejandro's Physical Media Collection</h1>
      <Link to="/collection" className='text-muted'>See full Movie Collection</Link>
      <CollectionInfo />
      <RecentlyAdded />
  </>
  )
}

export default Home
