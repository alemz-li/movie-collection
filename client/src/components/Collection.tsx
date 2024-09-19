import { useQuery } from '@tanstack/react-query'
import { getMovies } from '../api/collection'
import Movie from './Movie'
import usePagination from '../hooks/usePagination'
import { useState } from 'react'
import Loader from './Loader'

const Collection = () => {
  const { createPagination, page } = usePagination()
  const [sort, setSort] = useState('recent')

  const { isLoading, isError, error, data } = useQuery(
    ['collection', page, sort],
    () => getMovies(page, 25, sort),
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
      <button className='btn-simple' onClick={() => setSort(prev => prev === 'recent' ? 'alphabetically' : 'recent')}>Sort {sort === 'recent' ? 'alphabetically' : 'by recently added'}</button>
      <div className="collection">
        {data.results.map((movie) => (
          <Movie key={movie._id} movie={movie} />
        ))}
      </div>
      {createPagination(data.info)}
    </>
  )
}

export default Collection
