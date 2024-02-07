export const GenresIndex = (props) => {
  return (
    <div>
      <h1>Genres Index</h1>
      {props.genres.map(genre => (
        <div key={genre.id}>
          <h3>{genre.genre}</h3>
          <button onClick={() => props.onShowGenre(genre)}>More Info</button>
        </div>
      ))}
    </div>
  )
}