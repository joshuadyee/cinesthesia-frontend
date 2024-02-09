import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"

export function UsersIndex(props) {
  const [searchFilter, setSearchFilter] = useState("")
  
  return (
    <div>
    <h1>Users Index</h1>
    <p>
      Search: <input type="text" value={searchFilter} onChange={event => setSearchFilter(event.target.value)}/>
    </p>
    {props.users.filter(user => user.username.toLowerCase()
    .includes(searchFilter.toLowerCase()))
    .map(user => (
      <div key={user.id}>
        {/* <img src={user.profile_pic}/> */}
        <h3>{user.username}</h3>
          <p>Email: {user.email}</p>
          <p>Bio: {user.bio}</p>
        <h3>Favorites: </h3>
          <ul>
            {user.films.map((film, i) => (
              <div key={i}>
                <li>{film.title}</li>
                <img width="100px" src={film.film_poster} />
              </div>
            ))}
          </ul>
        <Link to={`/users/${user.id}`}>
          <button>View Profile</button>
        </Link>
        <hr />
      </div>
    ))}
    </div>
  )
}