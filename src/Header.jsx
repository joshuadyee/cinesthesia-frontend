import { LogoutLink } from "./LogoutLink"

export function Header() {

  let loggedInStatus

  if (localStorage.jwt) {
    loggedInStatus = (
      <>
        <a href="/users">Members</a> ||
        <a href="/films">Films</a> ||
        <a href="/actors">Actors</a> || 
        <a href="/directors">Directors</a> ||
        <a href="/genres">Genres</a> ||
        <a href="/reviews">Reviews</a> ||
        <a href="/logout">Log Out</a>
      </>
    )
  } else {
      loggedInStatus = (
        <>
          <a href="/login">Login</a> ||
          <a href="/signup">Create Account</a> 
        </>
      )
  }

  return (
    <header>
      <a href="/">Home</a> || {loggedInStatus}
    </header>
  )
}