import { Modal } from "../../Modal"
import { DirectorsShow } from "./DirectorsShow"
import { useEffect, useState } from "react"
import axios from "axios"

export const DirectorsIndex = (props) => {
  const [searchFilter, setSearchFilter] = useState("")
  const [directors, setDirectors] = useState([])
  const [isDirectorsShowVisible, setIsDirectorsShowVisible] = useState(false)
  const [currentDirector, setCurrentDirector] = useState({})

  const handleDirectorsIndex = () => {
    axios.get("http://localhost:3000/directors.json").then(response => {
      console.log("Directors Index", response.data)
      setDirectors(response.data)
    })
  }

  const handleShowDirector = director => {
    // console.log("showing director", director)
    setIsDirectorsShowVisible(true)
    setCurrentDirector(director)
  }

  const handleClose = () => {
    setIsDirectorsShowVisible(false)
  }
  
  useEffect(handleDirectorsIndex, [])

  return (
    <div>
      <Modal show={isDirectorsShowVisible} onClose={handleClose}>
        <DirectorsShow director={currentDirector}/>
      </Modal>
      
      <h1>Directors Index</h1>
      <p>
      Search: <input 
        type="text" 
        value={searchFilter}
        onChange={event => setSearchFilter(event.target.value)}
        />
      </p>
      {directors.filter(director => director.name.toLowerCase()
      .includes(searchFilter.toLowerCase()))
      .map(director => (
        <div key={director.id}>
          <h3>{director.name}</h3>
          <button onClick={() => handleShowDirector(director)}>More Info</button>
        </div>
      ))}
    </div>
  )
}
