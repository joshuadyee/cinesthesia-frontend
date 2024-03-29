import { useEffect, useState } from "react"
import axios from "axios"

export function ActorsIndex(props) {
  const [searchFilter, setSearchFilter] = useState("")

  const [actors, setActors] = useState([])
  
  const handleActorsIndex = () => {
    axios.get("http://localhost:3000/cast.json").then(response => {
      console.log("Actors Index", response.data)
      setActors(response.data)
    })
  }

  useEffect(handleActorsIndex, [])

  
  return (
    <div>
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
          <button onClick={() => props.onShowActor(actor)}>More Info</button>
        </div>
      ))}
    </div>
  )
}