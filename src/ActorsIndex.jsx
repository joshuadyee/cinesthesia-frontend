import { useState } from "react"

export function ActorsIndex(props) {
  const [searchFilter, setSearchFilter] = useState("")
  
  return (
    <div>
      <h1>Actors Index</h1>
      <p>
      Search: <input type="text" value={searchFilter} onChange={event => setSearchFilter(event.target.value)}/>
      </p>
      {props.actors.filter(actor => actor.name.toLowerCase()
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