import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { UserLinkBar } from "./UserLinkBar"


export function UsersShow({films}) {  
  
  const [user, setUser] = useState({films: [], film_users: []})

  const params = useParams()

  const getUser = () => {
    axios.get(`http://localhost:3000/users/${params.id}.json`)
    .then(response => {
      console.log("user data", response.data)
      setUser(response.data) 
    })
  }

  useEffect(getUser, [])

  return (
    <div>
      <h1>{user.username}</h1>
      <UserLinkBar />
        <img src={user.profile_picture} width="400px" />
        <p>{user.bio}</p>
        <p>Email: {user.email}</p>
        <h2>Favorites</h2>
          <ul>
            {user.films.map(film => (
              <div key={film.id}>
                <li>
                  <Link to={`/films/${film.id}`}>
                    <img width="100px" src={film.film_poster} 
                  /></Link>
                </li>
              </div>
            ))}
          </ul>
        <h2>Recent Reviews by {user.username}</h2>
          <ul>
            {user.film_users
            .filter(film_user => film_user.review !== null)
            .slice(-3)
              .map(review => (
              <div key={review.id}>
                <li><h3>{review.film}</h3></li>
                  <p>Rating: {review.rating}</p>
                  <p>Review: {review.review}</p>
              </div>
            ))}
          </ul>
        {/* <h2>Movies watched by {user.username}</h2>
        {user.film_users
        .filter(film_user => film_user.watched)
        .map(film_user => (
          <div key={film_user.id}>
            <p>{film_user.film}</p>
          </div>
        ))}
        <footer>Account created on {user.created_at}</footer> */}
    </div> 
  )
}