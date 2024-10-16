import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { UserLinkBar } from "./UserLinkBar"


export function UsersShow() {  
  
  const [user, setUser] = useState({films: [], film_users: []})

  const params = useParams()

  const getUser = () => {
    axios.get(`http://localhost:3000/users/${params.id}.json`)
    .then(response => {
      console.log("user data", response.data)
      setUser(response.data) 
    })
  }

  console.log("PARAMS", params)
  console.log("FAVES", user.films)
  console.log("REVIEWS", user.film_users)

  useEffect(getUser, [])

  return (
    <div className="py-4">
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
      <section className="mb-4">
        <h2 className="uppercase text-2xl tracking-wide">Favorite Films</h2>
        <hr className="border-2 bg-slate-100"/>
        <ul className="flex gap-4 justify-evenly" >
        {user.films.map(favorite => (
          <li key={favorite.id}>
            <a href={`/films/${favorite.id}`}>
              <img src={favorite.film_poster} className="w-40 h-full rounded-lg  hover:border-2 hover:border-green-400 object-contain" alt="film_poster"/>
            </a>
          </li>
        ))}
        </ul>
      </section>
      <section className="mb-4">
        <h2 className="uppercase text-2xl tracking-wide">Recently Watched</h2>
        <hr className="border-2 bg-slate-100"/>
        <ul className="flex gap-4">
          {user.film_users
            .slice(0,5)
            .map(review => (
            <li>
              <a href={`/films/${review.film_id}`}>
                <img src={review.film_poster} alt="film_poster" className="w-40 h-full rounded-lg  hover:border-2 hover:border-green-400 object-contain" />
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="uppercase text-2xl tracking-wide">
          Recent Reviews by {user.username}
        </h2>
        <hr className="border-2 bg-slate-100"/>
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
      </section>
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