export function GenresShow({genre}) {
  return (
    <div>
      <h2>{genre.genre} Films</h2>
      {genre.films.map((film, i) => (
        <ul key={i}>
          <li>{film.title}</li>
        </ul>
      ))}
    </div>
  )
}