import { useState } from "react"


export const DirectorsIndex = (props) => {
  const [searchFilter, setSearchFilter] = useState("")
  
  return (
    <div>
      <h1>Directors Index</h1>
      <p>
      Search: <input type="text" value={searchFilter} onChange={event => setSearchFilter(event.target.value)}/>
      </p>
      {props.directors.filter(director => director.name.toLowerCase()
      .includes(searchFilter.toLowerCase()))
      .map(director => (
        <div key={director.id}>
          <h3>{director.name}</h3>
          <button onClick={() => props.onShowDirector(director)}>More Info</button>
        </div>
      ))}
    </div>
  )
}
