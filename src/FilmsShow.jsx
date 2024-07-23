import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { UserReviewsNew } from "./UserReviewsNew"
import { CurrentUser } from "./Utility/CurrentUser"
import { Link } from "react-router-dom"

export function FilmsShow() {
  const [film, setFilm] = useState({
    casts: [],
    director: [],
    director_id: "",
    film_poster: "", 
    film_backdrop: "",
    film_users: [], 
    genres: [], 
    logline: "", 
    mpa_rating: "", 
    runtime: "", 
    title: "", 
    year: "",
  })
  
  const currentUser = CurrentUser() 
  const params = useParams()
  let genreList = film.genres.map(genre => genre.genre).join(", ")
  // console.log(genreList)

  const getFilm = () => {
    axios.get(`http://localhost:3000/films/${params.id}.json`).then(response => {
      console.log("getting film", response.data)
      setFilm(response.data)
    })
  }

  const handleCreateUserReview = (params, successCallback) => {
    // console.log("handle create userReview", params)
    axios.post("http://localhost:3000/film_users.json", params).then(response => {
      setUserReviews([...userReviews, response.data])
      successCallback()
    })
  }

  console.log(film.film_users)

  useEffect(getFilm, [])

  return(
    <section className="w-full">
      <img 
        src={film.film_backdrop}
        alt={film.title}
        className="w-full object-contain mb-4 opacity-90 rounded-b-lg shadow-2xl"
      />
      <div className="mx-auto flex px-5 mb-4 h-2/5">
        <div className="flex justify-center pr-2 text-gray-300 rounded-bl-lg flex-shrink-0">
          <img 
            src={film.film_poster}
            width="300px" 
            className="rounded-lg shadow-xl border-2 border-gray-300 hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          />
        </div>
        <div className="flex flex-col justify-center mx-auto w-1/2 min-w-1/2">
          <span className="mb-4 text-4xl font-extrabold md:text-5xl lg:text-6xl text-center text-white">
           {film.title}
            <span className="pl-4 text-2xl font-bold tracking-tight text-center hover:text-blue-500 hover:underline">
              {film.year}
            </span>
          </span>
          <span className="mb-5 text-center text-2xl font-bold leading-none tracking-tight">
            Directed by <a to={`/directors/${film.director_id}`} className="no-underline text-inherit hover:text-blue-500 hover:underline">{film.director}</a>  
          </span>
          <span className="mb-5 text-center align-middle">{film.logline}</span>
          <span className="text-center">
            <span className="border-2 border-white font-sans mr-1">{film.mpa_rating}</span>  {film.runtime} minutes // <span className="hover:text-blue">{genreList}</span>
          </span>
        </div>
      </div>
      <hr className="border-slate-300 border-2"/>
      <div>
        <h2>Recent Reviews</h2>
        {film.film_users.slice(0,5).map(review => (
          <ul key={review.id} className="text-lg">Review by <a className="no-underline text-inherit hover:text-blue-500 hover:underline" href={`/users/${review.user_id}`}>{review.user}</a>
              <li>{review.rating}</li>
              <li>{review.review}</li>
          </ul>
        ))}
      </div>
      <hr className="border-slate-300 border-2"/>
      <h2>Starring:</h2>
      {film.casts.map(cast => (
        <ul key={cast.id}>
          <li>{cast.name}</li>
        </ul>
      ))}
      <UserReviewsNew film={film} onCreateUserReview={handleCreateUserReview} currentUser={currentUser}/>
    </section>

  )
}