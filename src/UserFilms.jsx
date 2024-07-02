import { useEffect, useState } from "react"
import axios from "axios"

export function UserFilms({currentUser}) {

  const [user, setUser] = useState({films: [], film_users: []})
  
  const getCurrentUser = () => {
    axios.get(`http://localhost:3000/users/${currentUser.user_id}.json`).then(response => {
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
        .filter(film_user => film_user.watched === true)
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