export const DirectorsIndex = (props) => {
  return (
    <div>
      <h1>Directors Index</h1>
      {props.directors.map(director => (
        <div key={director.id}>
          <h3>{director.name}</h3>
          <button onClick={() => props.onShowDirector(director)}>More Info</button>
        </div>
      ))}
    </div>
  )
}
