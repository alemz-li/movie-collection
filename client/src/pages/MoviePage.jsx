import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovieById, updateMovie } from '../api/collection'
import { useState, useRef } from 'react'
import Toast from '../components/Toast'
import Loader from '../components/Loader'

const MoviePage = () => {
  const [updateError, setUpdateError] = useState('')
  const form = useRef()
  const watchedCheckbox = useRef()
  const queryClient = useQueryClient()
  const params = useParams()
  const navigate = useNavigate()

  // # TODO: Update Mutation
  const updateMutation = useMutation({
    mutationFn: updateMovie,
    onSuccess: () => {
      queryClient.invalidateQueries('collection')
      navigate('/admin')
    },
    onError: (error) =>{
        setUpdateError(error.response.data?.message)
    }
  })

  const handleSubmit = (ev) => {
    ev.preventDefault()

    setUpdateError('')
    const formData = new FormData(ev.target)

    const movieDetails = Object.fromEntries(formData)

    const { movie_id } = form.current.dataset 
    const updatedMovieDetails = {...movieDetails, watched: watchedCheckbox.current.checked}
    updateMutation.mutate({movie_id, movie: updatedMovieDetails})
  }

  const { isLoading, data:movie, isError, error} = useQuery(
  {
      queryKey: ['movie', params?.id],
      queryFn: () => getMovieById(params?.id),
      keepPreviousData: false,
    }
  )
  

  if(isLoading) return <Loader /> 
  else if(isError) return <div className='error'>{error}</div>

  return (
    <>
      <h1>Update movie details</h1>
      <div className="form-container">
      {updateError && <Toast status='error' message={updateError}/>}
      <form onSubmit={handleSubmit} data-movie_id={movie._id} ref={form}>
        <div className="form__group">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" defaultValue={movie.title} />
        </div>
        <div className="form__group">
          <label htmlFor="format">Format</label>
          <select name="format" defaultValue={movie.format}>
            <option value="DVD">DVD</option>
            <option value="Blu-ray">Blu-ray</option>
            <option value="4K UHD">4K UHD</option>
          </select>
        </div>
        <div className="form__group">
          <label htmlFor="type">Type</label>
          <select name="type" defaultValue={movie.type}>
            <option value="Movie">Movie</option>
            <option value="TV Show">TV Show</option>
          </select>
        </div>
        <div className="form__group">
          <label htmlFor="watched">Watched</label>
          <input type="checkbox" name="watched" ref={watchedCheckbox} defaultChecked={movie.watched} />
        </div>
        <button className='btn primary' type="submit">Update</button>
      </form>
      </div>
    </>
  )
}
export default MoviePage
