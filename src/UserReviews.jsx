import { CurrentUser } from "./Utility/CurrentUser"
import { useEffect, useState } from "react"
import axios from "axios" 

export function UserReviews() {
  const [user, setUser] = useState({films: [], film_users: []})

  const getCurrentUser = () => { 
    axios.get(`http://localhost:3000/users/${CurrentUser()}.json`).then(response => {
      console.log("current User data", response.data)
      setUser(response.data)
    }).catch(error => {
      console.log("Error", error)
    })
  }

  useEffect(getCurrentUser, [])

  if (user.film_users.length === 0) {
    return <h1>No Reviews Yet</h1>
  }
  return (
    <>
      <h1>Reviews</h1>
      {user.film_users.map(review => (
        <div key={review.id}>
          <img src={review.film_poster} width='50px' />
          <h2>{review.film}</h2>
          <p>{review.review}</p>
          <p>{review.rating}</p>
        </div>
      ))}
    </>
  )
} 