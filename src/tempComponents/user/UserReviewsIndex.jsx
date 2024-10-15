import axios from "axios"
import { useEffect, useState } from "react"


export function UserReviewsIndex() {
  const [userReviews, setUserReviews] = useState([])

  const handleUserReviewsIndex = () => {
    axios.get("http://localhost:3000/film_users.json").then(response => {
      console.log("Reviews Index", response.data)
      setUserReviews(response.data)
    })
  }
  
  useEffect(handleUserReviewsIndex, [])
  
  return (
    <div>
      <h1>User reviews index</h1>
      {userReviews.map(userReview => (
        <div key={userReview.id}>
          <h2 >{userReview.user}</h2>
            <h3>Film: {userReview.film}</h3>
              {/* <img src={userReview.film_poster} width="200px" /> */} 
              {/* need to add to img to backend */}
              <p>Rating: {userReview.rating}</p>
              <p>Review: {userReview.review}</p>
              <hr />
        </div>
      ))}
    </div>
  )
}