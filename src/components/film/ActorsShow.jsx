export function ActorsShow({actor}) {
  return (
    <div>
      <h1>Films Starring {actor.name}</h1>
      {actor.films.map((film, i) => (
        <ul key={i}>
          <li>{film.title}</li>
        </ul>
      ))}
    </div>
  )
}