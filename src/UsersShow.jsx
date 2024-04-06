import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"


export function UsersShow({films}) {  
  
  const [user, setUser] = useState({films: [], film_users: []})

  const params = useParams()

  const getUser = () => {
    console.log("getting user")
    axios.get(`http://localhost:3000/users/${params.id}.json`)
    .then(response => {
      console.log(response.data)
      setUser(response.data)
    })
  }

  console.log("films array", films)
  
  useEffect(getUser, [])

  return (
    <div>
      <h1>{user.username}</h1>
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
        <h2>Reviews by {user.username}</h2>
          <ul>
            {user.film_users.map(review => (
              <div key={review.id}>
                <li><h3>{review.film}</h3></li>
                  <p>Rating: {review.rating}</p>
                  <p>Review: {review.review}</p>
              </div>
            ))}
          </ul>
      <footer>Account created on {user.created_at}</footer>
    </div>
  )
}