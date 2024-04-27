import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { UserReviewsNew } from "./UserReviewsNew"
import { CurrentUser } from "./Utility/CurrentUser"

export function FilmsShow() {
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
    <div>
      <h1>{film.title}</h1>
        <h3>Directed by {film.director} ({film.year})</h3>
          <p>{film.logline}</p>
          <img src={film.film_poster} width="300px" />
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
    </div>

  )
}