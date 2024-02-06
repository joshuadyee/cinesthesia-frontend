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
            {Object.values(user.films).map(film => (
              <div key={film.id}>
                <li>{film.title}</li>
                <img width="100px" src={film.film_poster}/>
              </div>
            ))}
          </ul>
        {/* <p>Favorites: {JSON.stringify(user.films)}</p> */}
        <hr />
      </div>
    ))}
    </div>
  )
}