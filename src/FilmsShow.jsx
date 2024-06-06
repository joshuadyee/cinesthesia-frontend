import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { UserReviewsNew } from "./UserReviewsNew"
import { CurrentUser } from "./Utility/CurrentUser"
import { Link } from "react-router-dom"

export function FilmsShow(props) {
  const [film, setFilm] = useState({
    casts: [], director: "", film_poster: "", film_users: [], genres: [], logline: "", mpa_rating: "", runtime: "", title: "", year: ""
  })
  
  const currentUser = CurrentUser() 

  const params = useParams()

  const getFilm = () => {
    console.log("getting film")
    axios.get(`http://localhost:3000/films/${params.id}.json`).then(response => {
      console.log(response.data)
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
  

  useEffect(getFilm, [])

  return(
    <section className="p-5 ">

      <div className="flex flex-column">

        <div className="flex justify-center pr-2 text-gray-300 ">
          <img 
            src={film.film_poster}
            width="300px" 
            className="rounded-lg mr-4 "
          />
          <span className="align-bottom mb-2 text-4xl font-extrabold leading-none tracking-tight text-gray-100
           md:text-5xl lg:text-6xl text-center ">
            {film.title}
          <span className="px-2 text-center text-2xl font-bold leading-none tracking-tight">{film.year}</span>
          <span className="text-center text-2xl font-bold leading-none tracking-tight">
            Directed by <Link to={`/directors/${params.id}`}>{film.director} </Link> 
          </span>
          </span>
        </div>

        
      
      </div>

          <p>{film.logline}</p>
          <p>{film.mpa_rating} // {film.runtime} minutes</p>
          <h4>Starring:</h4>
          {film.casts.map(cast => (
            <ul key={cast.id}>
              <li>{cast.name}</li>
            </ul>
          ))}
          <h4>Recent Reviews</h4>
          {film.film_users.map(review => (
            <ul key={review.id}>Review by {review.user}
                <li>{review.rating}</li>
                <li>{review.review}</li>
                <hr />
            </ul>
          ))}
          <UserReviewsNew film={film} onCreateUserReview={handleCreateUserReview} currentUser={currentUser}/>
    </section>

  )
}