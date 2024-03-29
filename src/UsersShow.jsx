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

  const removeFavorite = (film) => {
    console.log("removing favorite", film)
    axios.delete(`http://localhost:3000/favorites/${film.id}.json`)
    .then(response => {
      console.log("remove response", response.data)
      setUser(currentUser => ({
        ...currentUser,
        films: currentUser.films.filter(f => f.id !== film.id)
      }));
      console.log("user object", user)
    })
    .catch(error => {
      console.error("Error adding favorite", error)
    })
  }

  const addFavorite = event => {
    console.log("adding favorite")
    event.preventDefault()
    const params = new FormData(event.target)
    for (const [key, value] of params.entries()) {
      console.log(key, value);
    }
    axios.post("http://localhost:3000/favorites.json", params)
    .then(response => {
      console.log("favorite film addition", response.data)
      setUser(currentUser => ({
        ...currentUser,
        films: [...currentUser.films, response.data]
      }));
      console.log("user", user)
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
                <p>
                  <button onClick={() => removeFavorite(film)}>Remove From Favorites</button>
                </p>
              </div>
            ))}
          </ul>
        <form onSubmit={addFavorite}>
          <label>
            Add a film to Favorites
            <select name="film_id" id="film">
              {films.map((film) => (
                <option key={film.id} value={film.id}>
                  {film.title}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Add to Favorites</button>  
        </form>
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