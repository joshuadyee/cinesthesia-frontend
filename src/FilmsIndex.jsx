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
          <h2><Link to={`/films/${film.id}`}>
          {film.title}
          </Link>
          </h2>
            <p>{film.year}</p>
            <img width="250px" src={film.film_poster} />
          <hr />
        </div>
      ))}
    </div>
  )
}