import { useQuery } from '@tanstack/react-query'
import { getRecent } from '../api/collection'
import Loader from './Loader'

const RecentlyAdded = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['recent'],
    queryFn: getRecent,
    keepPreviousData: true
  })

  if(isLoading) return <Loader /> 
  else if(isError) return <div>Error: {error}</div>

  return (
    <div className='container'>
      <div className='recently-added'>
        <h2>Latest additions</h2>
        <ul className='recently-added__list'>
        {data.map(movie => ((
          <li key={movie._id}>
            <div>
              <h3>{movie.title}</h3>
              <span className='text-muted'>{movie.format}. {movie.type}</span>  
            </div>
          </li>)))}
        </ul>
      </div>
    </div>
  )
}

export default RecentlyAdded
