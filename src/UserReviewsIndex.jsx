import { useTransition } from "react";

export function UserReviewsIndex(props) {
  return (
    <div>
      <h1>User reviews index</h1>
      {props.userReviews.map(userReview => (
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