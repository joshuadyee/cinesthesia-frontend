import { useState } from "react"

export const GenresIndex = (props) => {
  const [searchFilter, setSearchFilter] = useState("")
  
  return (
    <div>
      <h1>Genres Index</h1>
      <p>
      Search: <input type="text" value={searchFilter} onChange={event => setSearchFilter(event.target.value)}/>
      </p>
      {props.genres.filter(genre => genre.genre.toLowerCase()
      .includes(searchFilter.toLowerCase()))
      .map(genre => (
        <div key={genre.id}>
          <h3>{genre.genre}</h3>
          <button onClick={() => props.onShowGenre(genre)}>More Info</button>
        </div>
      ))}
    </div>
  )
}