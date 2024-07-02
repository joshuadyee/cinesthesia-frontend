export const UpdateBackend = async (data, props) => {     // declare an async function called updateBackend that takes a single argument called data
  let filmUser = props.film.film_users.find(filmUser => filmUser.user === props.currentUser.username)


  const method = filmUser ? 'PATCH' : 'POST' // declare a constant called method that is either 'PATCH' or 'POST' depending on whether the film has an id
  const url = filmUser ? `http://localhost:3000/film_users/${filmUser.id}.json` : "http://localhost:3000/film_users.json"

  const response  = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify(data)
  })
  if (response.ok) {
    console.log("Update Successful")
    console.log( "method", method, "url", url, "data", data)
  } else {
    console.error("Failed to update")
    console.log( "method", method, "url", url, "data", data)
  }
}
