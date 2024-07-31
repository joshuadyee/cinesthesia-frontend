import { useState } from "react";
import { Link } from "react-router-dom";


export function FilmsIndex({films}) {
  const [searchFilter, setSearchFilter] = useState("")

  const titleText = "Browse Your Favorite Films"

  const subtitleText = "Curate and Share Your Taste in Film"

  // console.log("Films Index", films)
  
  return (
    <div className="p-4">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white-100 md:text-5xl lg:text-6xl text-center">
        {titleText.toUpperCase()}
      </h1>
        <p className="text-center text-2xl font-bold leading-none tracking-tight">
          {subtitleText.toUpperCase()}
        </p>
        <form className="pb-4 text-right">
          <input 
            placeholder="Search by Title"
            type="text"
            value={searchFilter}
            onChange={event => setSearchFilter(event.target.value)}
            className="bg-purple-white shadow rounded border-0 p-2 text-black"
            list="titles"
          />
          <datalist id="titles">
          {films.slice(-3).map(film =>
            <option key={film.id}>{film.title}</option>
          )}
          </datalist>
        </form>
        <div className="grid grid-cols-5 gap-3">
          {films
            .filter(film => 
              film.title.toLowerCase().includes(searchFilter.toLowerCase()))
            .map(film => (
            <div  key={film.id} >
              <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden">
                <Link to={`/films/${film.id}`} className="hover:border-4 hover:border-green-400 block">
                  <img 
                    src={film.film_poster}
                    className="w-full h-auto object-cover" 
                    alt={film.title} 
                  />
                </Link>
                <div className="flex items-center justify-center p-1 bg-inherit">
                  <small className="text-gray-600 text-muted text-center">
                    {film.year} /\ {film.mpa_rating}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}
