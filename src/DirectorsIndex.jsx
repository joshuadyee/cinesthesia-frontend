import { useEffect, useState } from "react"
import axios from "axios"

export const DirectorsIndex = (props) => {
  const [searchFilter, setSearchFilter] = useState("")

  const [directors, setDirectors] = useState([])

  const handleDirectorsIndex = () => {
    axios.get("http://localhost:3000/directors.json").then(response => {
      console.log("Directors Index", response.data)
      setDirectors(response.data)
    })
  }
  
  useEffect(handleDirectorsIndex, [])

  return (
    <div>
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
          <button onClick={() => props.onShowDirector(director)}>More Info</button>
        </div>
      ))}
    </div>
  )
}
