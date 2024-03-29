import { useEffect, useState } from "react"
import axios from "axios"

export const GenresIndex = (props) => {
  const [searchFilter, setSearchFilter] = useState("")

  const [genres, setGenres] = useState([])

  const handleGenresIndex = () => {
    axios.get("http://localhost:3000/genres.json").then(response => {
      console.log("genres index data", response.data)
      setGenres(response.data)
    })
  }

  useEffect(handleGenresIndex, [])
  
  return (
    <div>
      <h1>Genres Index</h1>
      <p>
      Search: <input 
        type="text"
        value={searchFilter}
        onChange={event => setSearchFilter(event.target.value)}
        />
      </p>
      {genres.filter(genre => genre.genre.toLowerCase()
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