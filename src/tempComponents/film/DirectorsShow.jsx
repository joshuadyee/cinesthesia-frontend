export function DirectorsShow({director}) {
  return (
    <div>
      <h1>Films Directed By {director.name}</h1>
      {director.films.map((film, i) => (
        <ul key={i}>
          <li>{film.title}</li>
        </ul>
      ))}
    </div>
  )
}