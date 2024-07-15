import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export function UsersIndex() {
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
    <section className="p-5">
      <h1>Cinesthesia Members</h1>
      <form className="pb-4 text-right">
        <input 
          placeholder="Search by Username..."
          type="text"
          value={searchFilter}
          onChange={event => setSearchFilter(event.target.value)}
          className="text-black bg-purple-white shadow rounded border-0 p-2"
        />
      </form>
      {users
        .filter(user => 
          user.username.toLowerCase().includes(searchFilter.toLowerCase()))
        .map(user => (
      <div key={user.id} className="focus:outline-none">
        <img src={user.profile_picture} width="150px"/>
        <Link to={`/users/${user.id}`} className="focus:outline-none">
          <h3 className="focus:outline-none">{user.username}</h3>
        </Link>
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
    </section>
  )
}