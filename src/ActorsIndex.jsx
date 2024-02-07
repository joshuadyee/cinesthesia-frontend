export function ActorsIndex(props) {
  return (
    <div>
      <h1>Actors Index</h1>
      {props.actors.map(actor => (
        <div key={actor.id}>
          <h3>{actor.name}</h3>
          <button onClick={() => props.onShowActor(actor)}>More Info</button>
        </div>
      ))}
    </div>
  )
}