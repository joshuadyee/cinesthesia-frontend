// declare an async function called updateBackend that takes in data and props as arguments

export const UpdateBackend = async (data, props) => {    

  // initialize the variable filmUser to the first film_user object in the film_users array that has a user attribute that matches the current user's username
  let filmUser = props.film.film_users.find(filmUser => filmUser.user === props.currentUser.username)

  // declare a constant "method" that is either 'PATCH' or 'POST' depending on whether the film has an id
  const method = filmUser ? 'PATCH' : 'POST' 

  // declare a constant "url" that is either the url of the film_user object or the new film_user object
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
