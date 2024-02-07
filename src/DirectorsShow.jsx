export function DirectorsShow(props) {
  return (
    <div>
      <h1>Films Directed By {props.director.name}</h1>
      {props.director.films.map((film, i) => (
        <ul key={i}>
          <li>{film.title}</li>
        </ul>
      ))}
    </div>
  )
}