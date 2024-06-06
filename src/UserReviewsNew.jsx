import { Modal } from "./Modal"
import { Login } from "./Login"
import { useEffect, useState } from "react"
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

  const updateBackend = async (data) => {     // declare an async function called updateBackend that takes a single argument called data
    let filmUser = props.film.film_users.find(filmUser => filmUser.user === props.currentUser.username)


    const method = filmUser ? 'PATCH' : 'POST' // declare a constant called method that is either 'PATCH' or 'POST' depending on whether the film has an id
    const url = filmUser ? `http://localhost:3000/film_users/${filmUser.id}.json` : "http://localhost:3000/film_users.json"

    const response  = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(data)
    })
    if (response.ok) {
      console.log("Update Successful")
      console.log( "method", method, "url", url, "data", data)
    } else {
      console.error("Failed to update")
      console.log( "method", method, "url", url, "data", data)
    }
  }

  const handleWatchedChange = (filmId, isChecked) => {
    setWatched(isChecked)
    localStorage.setItem(`watched-${filmId}`, isChecked)
    updateBackend({ watched: isChecked, film_id: filmId})
  }

  const handleReviewChange = (event) => {
    const newReview = event.target.value
    setReview(newReview)
    updateBackend({ review: newReview, film_id: props.film.id})
  }

  const handleRatingChange = (event) => {
    const newRating = event.target.value 
    setRating(newRating)
    updateBackend({ rating: newRating, film_id: props.film.id})
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
      <div>
        <h3>
          Please <button onClick={handleShowLoginModal}>Login</button> to add a review
          <Modal show={isModalShowVisible} onClose={handleClose}>
            <Login />
          </Modal>
        </h3>
      </div>
    )
  } else {
    return (
      <div>
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
      </div>
    )
  }
}