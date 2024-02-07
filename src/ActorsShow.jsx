export function ActorsShow(props) {
  return (
    <div>
      <h1>Films Starring {props.actor.name}</h1>
      {props.actor.films.map((film, i) => (
        <ul key={i}>
          <li>{film.title}</li>
        </ul>
      ))}
    </div>
  )
}