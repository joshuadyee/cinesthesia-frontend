export function ActorsIndex(props) {
  return (
    <div>
      <h1>Actors Index</h1>
      {props.actors.map(actor => (
        <div key={actor.id}>
          <p>{actor.name}</p>
          <p>
            <button onClick={() => props.onShowActor(actor)}>More Info</button>
          </p>
        </div>
      ))}
    </div>
  )
}