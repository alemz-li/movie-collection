import watched from '../assets/watched.svg'
import not_watched from '../assets/not-watched.svg'
const Movie = ({ movie }) => {

  const assignFormatColor = (format) => {
    let frmt = format.toLowerCase()

    if(frmt.includes('blu-ray')){
      return 'bluray'
    }else if(frmt.includes('dvd')){
      return 'dvd'
    }else {
      return 'uhd'
    }
  }

  return (
    <div className="movie">
      <div className={`movie__format ${assignFormatColor(movie.format)}`}>{movie.format}</div>
        <h2 className="movie__title">{movie.title}</h2>
      <div className="movie__details">
        <div className="movie__type text-muted">{movie.type}</div>
        <img src={movie.watched ? watched : not_watched} alt={movie.wachted ? 'watched': 'not watched'}/>
      </div>
    </div>
  )
}

export default Movie
