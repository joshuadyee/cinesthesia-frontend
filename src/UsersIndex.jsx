import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export function UsersIndex(props) {
  const [searchFilter, setSearchFilter] = useState("")

  const [users, setUsers] = useState([])

  const handleUsersIndex = () => {
    axios.get("http://localhost:3000/users.json").then(response => {
      console.log("users index", response.data)
      setUsers(response.data)
    })
  }

  useEffect(handleUsersIndex, [])
  
  return (
    <div>
    <h1 className="usersIndexTitle">Cinesthesia Members</h1>
    <p>
      Search: <input 
        type="text" 
        value={searchFilter} 
        onChange={event => setSearchFilter(event.target.value)}
      />
    </p>
    {users.filter(user => user.username.toLowerCase()
    .includes(searchFilter.toLowerCase()))
    .map(user => (
      <div key={user.id}>
        <img src={user.profile_picture} width="150px"/>
        <Link to={`/users/${user.id}`}>
          <h3>{user.username}</h3>
        </Link>
          <p>Email: {user.email}</p>
          <p>Bio: {user.bio}</p>
        <h3>Recent Reviews by {user.username}</h3>
          <ul>
            {user.film_users
            .slice(0,3)
            .map((film_user, i) => (
              <div key={i}>
                <h5>{film_user.film}</h5>
                <p>{film_user.review}</p>
              </div>
            ))}
          </ul>
        <hr />
      </div>
    ))}
    </div>
  )
}