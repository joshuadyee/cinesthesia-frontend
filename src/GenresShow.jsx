export function GenresShow(props) {
  return (
    <div>
      <h2>{props.genre.genre} Films</h2>
      {props.genre.films.map((film, i) => (
        <ul key={i}>
          <li>{film.title}</li>
        </ul>
      ))}
    </div>
  )
}