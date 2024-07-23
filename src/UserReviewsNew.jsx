import { Modal } from "./Modal"
import { Login } from "./Login"
import { useEffect, useState } from "react"
import { UpdateBackend } from "./Utility/UpdateBackend"
import axios from "axios"

export function UserReviewsNew(props) {
  
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0)
  const [watched, setWatched] = useState(
    localStorage.getItem(`watched-${props.film.id}`) === 'true')
  const [isModalShowVisible, setIsModalShowVisible] = useState(false) 

  console.log("current User", props.currentUser)

  const handleGetRatingAndReview = () => {
    axios.get(`http://localhost:3000/film_users/${props.film.id}.json`).then(response => {
      console.log("current User data", response.data)
      setRating(response.data.rating)
      setReview(response.data.review)
    }).catch(error => {
      console.log("Error", error)
    })
  }

  const handleWatchedChange = (filmId, isChecked) => {
    setWatched(isChecked)
    localStorage.setItem(`watched-${filmId}`, isChecked)
    UpdateBackend({ watched: isChecked, film_id: filmId}, props)
  }

  const handleReviewChange = (event) => {
    const newReview = event.target.value
    setReview(newReview)
    UpdateBackend({ review: newReview, film_id: props.film.id}, props)
  }

  const handleRatingChange = (event) => {
    const newRating = event.target.value 
    setRating(newRating)
    UpdateBackend({ rating: newRating, film_id: props.film.id}, props)
  }

  const handleShowLoginModal = () => {
    setIsModalShowVisible(true)
  }

  const handleClose = () => {
    setIsModalShowVisible(false)
  }

  useEffect(() => {
    setWatched(localStorage.getItem(`watched-${props.film.id}`) === 'true')
  }, [props.film.id])

  useEffect(handleGetRatingAndReview, [])

  if (!localStorage.jwt) {
    return (
      <div className="-mb-2 pb-2">
        <h3>
          Please 
          <button className="hover:text-blue-500 hover:underline" onClick={handleShowLoginModal}>Login</button> to add a review
          <Modal show={isModalShowVisible} onClose={handleClose}>
            <Login />
          </Modal>
        </h3>
      </div>
    )
  } else {
    return (
      <aside>
        <h1>New Review</h1>
        <form>
          <div>
            {/* Film ID: <input name="film_id" type="number" /> */}
            <input
              type="hidden"
              name="film_id"
              value={props.film.id || ""}/>
          </div>
          <div>
            Watched: <input 
              type="checkbox"
              name="watched"
              checked={watched}
              onChange={(e) => handleWatchedChange(props.film.id, e.target.checked)}
              />
          </div>
          <div>
            Rating: <input 
              className="text-black"
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={rating}
              onChange={handleRatingChange} />
          </div> 
          <div>
            Review: <input
              className="text-black"
              name="review"
              type="text"
              value={review}
              onChange={handleReviewChange} />
          </div>
        </form>
      </aside>
    )
  }
}