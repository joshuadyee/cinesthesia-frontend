export function UsersShow(props) {  
  return (
    <div>
      <h1>Reviewed Films by {props.user.username}</h1>
      {props.user.film_users.map(film_user => (
        <div key={film_user.id}>
          <h3>{film_user.film}</h3>
            <p>Rating: {film_user.rating}</p>
            <p>Review: {film_user.review}</p>
        </div>
      ))}
    </div>
  )
}