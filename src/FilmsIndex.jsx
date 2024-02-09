import { useState } from "react"
import { Link } from "react-router-dom"

export function FilmsIndex(props) {
  const [searchFilter, setSearchFilter] = useState("")

  return (
    <div>
      <h1>Films Index</h1>
      <p>
        Search: <input type="text" value={searchFilter} onChange={event => setSearchFilter(event.target.value)}/>
      </p>
      {props.films.filter(film => film.title.toLowerCase()
      .includes(searchFilter.toLowerCase()))
      .map(film => (
        <div key={film.id}>
          {/* <p>{film.id}</p> */}
          <h2>{film.title}</h2>
          <p>Directed by <b>{film.director}</b></p>
          <p>{film.year}</p>
          <p>{film.runtime} minutes</p>
          <p>{film.logline}</p>
          <p>{film.mpa_rating}</p>
          <img width="250px" src={film.film_poster} />
          <p>
            <button onClick={() => props.onShowFilm(film)}>More Info</button>
          </p>
          <Link to="/reviews/new">
            <button>Rate or Review</button>
          </Link>
          <hr />
        </div>
      ))}
    </div>
  )
}