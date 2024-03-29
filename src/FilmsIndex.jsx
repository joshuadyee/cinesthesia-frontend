import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";

export function FilmsIndex(props) {
  const [searchFilter, setSearchFilter] = useState("")

  // const [films, setFilms] = useState([])

  // const handleFilmsIndex = () => {
  //   axios.get("http://localhost:3000/films.json").then(response => {
  //     console.log("Films Index", response.data)
  //     setFilms(response.data)
  //   })
  // }

  // useEffect(handleFilmsIndex, [])

  return (
    <div>
      <h1 className="welcomeTitle">Browse Your Favorite Films</h1>
        <h2 className="welcomeSubtitle">Curate and Share Your Taste in Film</h2>
        <p>
          Search: <input 
            type="text"
            value={searchFilter}
            onChange={event => setSearchFilter(event.target.value)} />
        </p>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {props.films.filter(film => film.title.toLowerCase().includes(searchFilter.toLowerCase())).map(film => (
            <div className="col" key={film.id}>
              <div className="card h-100">
                <Link to={`/films/${film.id}`} className="btn btn-primary">
                  <img src={film.film_poster} className="card-img-top img-fluid" alt={film.title} />
                </Link>
                <div className="card-body">
                  <h3 className="card-title">{film.title}</h3>
                  <p className="card-text">{film.logline}</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">{film.year} // {film.mpa_rating}</small><br/>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}
