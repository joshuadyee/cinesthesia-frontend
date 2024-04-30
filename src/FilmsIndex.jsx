import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

export function FilmsIndex(props) {
  const [searchFilter, setSearchFilter] = useState("")

  return (
    <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <h1 className="">{"Browse Your Favorite Films".toUpperCase()}</h1>
        <h2 className="">{"Curate and Share Your Taste in Film".toUpperCase()}</h2>
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
