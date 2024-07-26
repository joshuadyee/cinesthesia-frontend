import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { UserLinkBar } from "./UserLinkBar"
import { Modal } from "./Modal"

export function UserProfile({currentUser, films}) {
  const [user, setUser] = useState({films: [], film_users: []})
  const [isFavoritesModalShowVisible, setIsFavoritesModalShowVisible] = useState(false)
  
  const favorites = user.films

  const getCurrentUser = () => {
    axios.get(`http://localhost:3000/users/${currentUser.user_id}.json`).then(response => {
      console.log("current User data", response.data)
      setUser(response.data)
    }).catch(error => {
      console.log("Error", error)
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

  const handleShowFavoritesModal = () => {
    console.log("faves")
    setIsFavoritesModalShowVisible(true)
  }

  const handleClose = () => {
    setIsFavoritesModalShowVisible(false)
  }
  console.log("FILMS", films)
  console.log("FAVORITES", user.films)
  console.log("REVIEWS", user.film_users)

  useEffect(getCurrentUser, [])

  return (
  <div className="p-4">
    <section className="mt-2">
      <div className="flex mb-4">
        <img src={user.profile_picture}  className="h-36 w-36 rounded-full mx-4"/>
        <div className="flex flex-col">
          <h1 className="font-medium ">{user.username}</h1>
          <hr className="border-3 "/>
          <p className="text-bottom">{user.bio}</p>
        </div>
      </div>
      <UserLinkBar />
    </section>
    <div className="mb-4">
      <h2 className="uppercase text-3xl">Favorite Films</h2>
      <hr className="border-1"/>
      <ul className="flex flex-row gap-5">
        {user.films.map(film => (
          <div key={film.id}>
            <li className="group">
              <a href={`/films/${film.id}`}>
                <img src={film.film_poster} className="w-40 h-full rounded-lg object-contain group-hover:border-2 group-hover:border-blue-500" alt={film.title}
              />
              </a>
            </li>
            <p>
              <button onClick={() => removeFavorite(film)}>Remove From Favorites</button>
            </p>
          </div>
        ))}
      </ul>
      <button className="py-1 px-1 border-1 bg-blue-500 rounded-full" onClick={handleShowFavoritesModal}>
        Edit Favorites
      </button>
      {/* <form onSubmit={addFavorite}>
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
      </form> */}

    </div>
    <div>
      <h2 className="uppercase text-2xl">Recently Watched Films</h2>
      <hr className="border-1"/>
      <ul className="flex flex-row gap-5 ">
      {user.film_users
        .slice(0,5)
        .filter(film_user => film_user.watched)
        .map(film_user => (
            <li className="group">
              <a href={`/films/${film_user.film_id}`}>
                <img src={film_user.film_poster} alt="film_poster" className="w-40 h-full rounded-lg object-contain group-hover:border group-hover:border-blue-500"/>
              </a>
            </li>
        ))
      }
      </ul>
    </div>
    {/* <h2>Reviews by {user.username}</h2>
      <ul>
        {user.film_users.map(review => (
          <div key={review.id}>
            <li><h3>{review.film}</h3></li>
              <p>Rating: {review.rating}</p>
              <p>Review: {review.review}</p>
          </div>
        ))}
      </ul> */}
    <footer>Account created on {user.created_at}</footer>
  </div>
  )
}

