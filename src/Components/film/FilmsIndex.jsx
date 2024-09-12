import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../../components/SearchBar";


export function FilmsIndex({films}) {
  const [searchFilter, setSearchFilter] = useState("")

  const titleText = "Browse Your Favorite Films"

  const subtitleText = "Curate and Share Your Taste in Film"
  
  return (
    <section className="p-8 flex flex-col">
      <div className="p-8 ">
        <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl text-center">
          {titleText}
        </h1>
        <h3 className="text-center texttext-2xl font-bold text-slate-200 tracking-tight">
          {subtitleText}
        </h3>
        <SearchBar 
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          placeholder={"Title"}
          list="titles"
        />
        <datalist id="titles">
        {films.slice(-3).map(film =>
          <option key={film.id}>{film.title}</option>
        )}
        </datalist>
      </div>
      <div className="grid grid-cols-4 gap-3 min-w-md md:grid-cols-3 lg:grid-cols-4 min-w-[640px]">
        {films
          .filter(film => 
            film.title.toLowerCase().includes(searchFilter.toLowerCase()))
          .map(film => (
          // card
          <div  key={film.id} className="border-2 border-gray-600 hover:!border-4 hover:!border-green-400 rounded-xl"> 
            <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden">
              <Link to={`/films/${film.id}`}>
                <img 
                  src={film.film_poster}
                  className="w-full h-auto object-contain" 
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
    </section>
  )
}
