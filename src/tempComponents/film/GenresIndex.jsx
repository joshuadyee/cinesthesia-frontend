import { Modal } from "../../Modal"
import { GenresShow } from "./GenresShow"
import { useEffect, useState } from "react"
import axios from "axios"

export const GenresIndex = () => {
  const [searchFilter, setSearchFilter] = useState("")
  const [genres, setGenres] = useState([])
  const [isGenresShowVisible, setIsGenresShowVisible] = useState(false)
  const [currentGenre, setCurrentGenre] = useState({})

  const handleGenresIndex = () => {
    axios.get("http://localhost:3000/genres.json").then(response => {
      console.log("genres index data", response.data)
      setGenres(response.data)
    })
  }

  const handleShowGenre = genre => {
    setIsGenresShowVisible(true)
    setCurrentGenre(genre)
  }

  const handleClose = () => {
    setIsGenresShowVisible(false)
  }

  useEffect(handleGenresIndex, [])
  
  return (
    <div>

      <Modal show={isGenresShowVisible} onClose={handleClose}>
        <GenresShow genre={currentGenre}/>
      </Modal>

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
          <button onClick={() => handleShowGenre(genre)}>More Info</button>
        </div>
      ))}
    </div>
  )
}