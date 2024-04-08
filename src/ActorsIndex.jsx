import { Modal } from "./Modal"
import { ActorsShow } from "./ActorsShow"
import { useEffect, useState } from "react"
import axios from "axios"

export function ActorsIndex(props) {
  const [searchFilter, setSearchFilter] = useState("")
  const [actors, setActors] = useState([])
  const [isActorsShowVisible, setIsActorsShowVisible] = useState(false)
  const [currentActor, setCurrentActor] = useState({})
  
  const handleActorsIndex = () => {
    axios.get("http://localhost:3000/cast.json").then(response => {
      console.log("Actors Index", response.data)
      setActors(response.data)
    })
  }

  const handleShowActor = actor => {
    // console.log("showing actor", actor)
    setIsActorsShowVisible(true)
    setCurrentActor(actor)
  }

  const handleClose = () => {
    setIsActorsShowVisible(false)
  }

  useEffect(handleActorsIndex, [])

  
  return (
    <div>
      <Modal show={isActorsShowVisible} onClose={handleClose}>
        <ActorsShow actor={currentActor}/>
      </Modal>

      <h1>Actors Index</h1>
      <p>
      Search: <input
        type="text"
        value={searchFilter}
        onChange={event => setSearchFilter(event.target.value)}
        />
      </p>
      {actors.filter(actor => actor.name.toLowerCase()
      .includes(searchFilter.toLowerCase()))
      .map(actor => (
        <div key={actor.id}>
          <h3>{actor.name}</h3>
          <button onClick={() => handleShowActor(actor)}>More Info</button>
        </div>
      ))}
    </div>
  )
}