import MovieForm from '../components/MovieForm'
import ManageCollection from '../components/ManageCollection'
import Logout from '../components/Logout'
const Admin = () => {
  return (
    <div>
      <h1>Admin Page</h1>
      <div className="admin">
        <p className='text-muted'>Manage your collection</p>
        <Logout />
      </div>
      <MovieForm />
      <ManageCollection />
    </div>
  )
}

export default Admin
