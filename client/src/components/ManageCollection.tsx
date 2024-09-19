import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMovies, deleteMovie } from '../api/collection'
import { Link } from 'react-router-dom'
import usePagination from '../hooks/usePagination'
import editSvg from '../assets/edit.svg'
import removeSvg from '../assets/remove.svg'
import {useState} from 'react'
import Toast from '../components/Toast'
import Loader from './Loader'

const ManageCollection = () => {
  const [success, setSuccess] = useState('')
  const { createPagination, page } = usePagination()
  const queryClient = useQueryClient()
  
  const deleteMutation = useMutation({
    mutationFn: deleteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries(['collection'])
      queryClient.removeQueries('movie')

      setSuccess('Movie removed from collection')
    },
  })
  
  const { isLoading, isError, error, data } = useQuery(
    ['manage', page],
    () => getMovies(page, 25, 'alphabetically'),
    {
      keepPreviousData: true,
    }
  )

  if (isLoading) return <Loader />
  else if (isError) return <div>Error {error.message}</div>

  return data.results.length <= 0 ? (
    <div>There are no movies to display</div>
  ) : (
    <>
      <h2>Entries</h2>
      {success && <Toast status='success' message={success}/>}
      <div className='admin__table'>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Format</th>
                <th>Type</th>
                <th colSpan={2} className='text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
            {data.results.map((movie) => (
              <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.format}</td>
                  <td>{movie.type}</td>
                  <td><Link className='btn' to={`/admin/movie/${movie._id}`}><img src={editSvg} alt="Edit"/></Link></td>
                  <td><button className='btn remove' onClick={() => {
                    setSuccess('')
                    deleteMutation.mutate(movie._id)}
                  }><img src={removeSvg} alt="Remove"/></button></td>
              </tr>
            ))}
            </tbody>
          </table>
      </div>
      {createPagination(data.info)}
    </>
  )
}

export default ManageCollection
