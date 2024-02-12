export function UserReviewsNew(props) {
  const handleSubmit = event => {
    event.preventDefault()
    const params = new FormData(event.target)
    props.onCreateUserReview(params, () => event.target.result)
    window.location.href = "/reviews/index"
  }
  
  return (
    <div>
      <h1>New Review</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Film ID: <input name="film_id" type="number" />
          {/* <input type="hidden" name="film_id" value={props.film.id}/> */}
        </div>
        <div>
          Rating: <input name="rating" type="number" step="0.1" min="0" max="10" />
        </div> 
        <div>
          Review: <input name="review" type="text" />
        </div> <br />
        <button type="submit">Create Review</button>
      </form>
    </div>
  )
}