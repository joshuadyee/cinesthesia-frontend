import axios from "axios"
import { Link } from "react-router-dom"

export function UsersIndex(props) {

  
  return (
    <div>
    <h1>Users Index</h1>
    {props.users.map(user => (
      <div key={user.id}>
        {/* <img src={user.profile_pic}/> */}
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
        <p>Bio: {user.bio}</p>
        <p>Favorites: </p>
          <ul>
            {user.films.map((film, i) => (
              <div key={i}>
                <li>{film.title}</li>
                <img width="100px" src={film.film_poster} />
              </div>
            ))}
          </ul>
        {/* <button onClick={() => props.onShowUser(user)}>User Info</button> */}
        <Link to={`/users/${user.id}`}>
          <button>View Profile</button>
        </Link>
        <hr />
      </div>
    ))}
    </div>
  )
}