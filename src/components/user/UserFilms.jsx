import { useEffect, useState } from "react"
import axios from "axios"

export function UserFilms({currentUser}) {

  const [user, setUser] = useState({film_users: []})
  
  const getCurrentUser = () => {
    axios.get(`http://localhost:3000/users/${currentUser.user_id}.json`).then(response => {
      // console.log("current User data", response.data)
      setUser(response.data)
    }).catch(error => {
      console.log("Error", error)
    })
  }

  console.log("films", user.film_users)

  useEffect(getCurrentUser, []);
  

  return (
    <div className="p-8"> 
      <h1 className="mb-8">{user.username} Films</h1>
      {user.film_users
        .filter(film_user => film_user.watched === true)
        .map(film_user => (
          <div key={film_user.id} className="inline-flex gap-2 items-center">
            <a href={`/films/${film_user.film_id}`} className="h-full w-32 rounded border-3 border-gray-600 hover:border-green-500">
              <img src={film_user.film_poster}/>
            </a>
          </div>
      ))}
    </div>
  )
}