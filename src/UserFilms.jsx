import { useEffect, useState } from "react"
import { CurrentUser } from "./Utility/CurrentUser"
import axios from "axios"

export function UserFilms() {

  const [user, setUser] = useState({films: [], film_users: []})
  
  const getCurrentUser = () => {
    axios.get(`http://localhost:3000/users/${CurrentUser()}.json`).then(response => {
      console.log("current User data", response.data)
      setUser(response.data)
    }).catch(error => {
      console.log("Error", error)
    })
  }


  useEffect(getCurrentUser, [])


  return (
    <div>
      <h1>Films the user has watched</h1>
      {user.film_users
      .filter(film_user => film_user.watched)
      .map(film_user => (
        <div key={film_user.id}>
          <p>
            <img src={film_user.film_poster} width="100px"/>
          </p>          
        </div>
      ))}
    </div>
  )
}