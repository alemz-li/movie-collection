import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addMovie } from '../api/collection'
import { useState, useRef } from 'react'
import Toast from './Toast'

const MovieForm = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const watchedCheckbox = useRef()
  const form = useRef()
  const queryClient = useQueryClient()

  const movieMutation = useMutation({
    mutationFn: addMovie,
    onSuccess: (resp) => {
      queryClient.invalidateQueries('collection')
     
      setSuccess(`${resp.title} was added.`)
      // Reset form fields
      form.current.reset()
    },
    onError: (error) =>{
      setError(error.response.data?.message ?? 'Something went wrong')
    }
  })

  const handleSubmit = (ev) => {
    ev.preventDefault()

    setError('')
    setSuccess('')
    const formData = new FormData(ev.target)

    const movieDetails = Object.fromEntries(formData)

    movieMutation.mutate({
      ...movieDetails,
      watched: watchedCheckbox.current.checked,
    })
  }
  
  return (
    <>
    {error && <Toast status='error' message={error} />}
    {success && <Toast status='success' message={success}/>}
    <form onSubmit={handleSubmit} ref={form}>
      <div className="form__group">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" />
      </div>
      <div className="form__group">
        <label htmlFor="format">Format</label>
        <select name="format">
          <option value="DVD">DVD</option>
          <option value="Blu-ray">Blu-ray</option>
          <option value="4K UHD">4K UHD</option>
        </select>
      </div>
      <div className="form__group">
        <label htmlFor="type">Type</label>
        <select name="type">
          <option value="Movie">Movie</option>
          <option value="TV Show">TV Show</option>
        </select>
      </div>
      <div className="form__group">
        <label htmlFor="watched">Watched</label>
        <input type="checkbox" name="watched" ref={watchedCheckbox} />
      </div>
      <button className='btn primary' type="submit">Add</button>
    </form>
    </>
  )
}

export default MovieForm
