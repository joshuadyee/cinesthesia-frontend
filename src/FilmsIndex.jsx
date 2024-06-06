import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

export function FilmsIndex(props) {
  const [searchFilter, setSearchFilter] = useState("")

  const titleText = "Browse Your Favorite Films"

  const subtitleText = "Curate and Share Your Taste in Film"

  console.log("Films Index", props.films)

  return (
    <div className="p-4">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black text-center">{titleText.toUpperCase()}</h1>
        <p className="text-center text-2xl font-bold leading-none tracking-tight">{subtitleText.toUpperCase()}</p>
        <form className="pb-4 text-right">
          <input 
            placeholder="Search by Title..."
            type="text"
            value={searchFilter}
            onChange={event => setSearchFilter(event.target.value)}
            className="bg-purple-white shadow rounded border-0 p-2 text-black"
          />
        </form>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {props.films.filter(film => 
            film.title
              .toLowerCase()
              .includes(searchFilter.toLowerCase()))
              .map(film => (
            <div className="col" key={film.id}>
              <div className="card h-100">
                <Link to={`/films/${film.id}`} className="btn btn-primary">
                  <img 
                    src={film.film_poster}
                    className="card-img-top img-fluid" 
                    alt={film.title} 
                  />
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
