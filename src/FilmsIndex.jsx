import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

export function FilmsIndex(props) {
  const [searchFilter, setSearchFilter] = useState("")

  return (
    <div className="bg-white">
      <h1 className="text-xl font-thin">Browse Your Favorite Films</h1>
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
