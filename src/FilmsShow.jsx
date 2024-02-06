export function FilmsShow(props) {
  return(
    <div>
      <h1>{props.film.title}</h1>
      <p>Director: {props.film.director}</p>
      <p>Cast: </p>
        <ul>{Object.values(props.film.casts).map(cast => (
          <div key={cast.id}>
            <li>{cast.name}</li>
          </div>
        ))}
        </ul>
        <p>Genre: </p>
        <ul>{Object.values(props.film.genres).map(genre => (
          <div key={genre.id}>
            <li>{genre.genre}</li>
          </div>
        ))}
        </ul>
        <img width="100px" src={props.film.film_poster} />
        {/* {JSON.stringify(props.film.casts)} */}
    </div>
  )
}