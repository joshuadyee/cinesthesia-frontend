import { LogoutLink } from "./LogoutLink"

export function Header() {
  // let loggedInStatus

  // if (localStorage.jwt) {
  //   loggedInStatus = (
  //     <>
  //       <li><LogoutLink /></li>
  //     </>
  //   )
  // } else {
  //   loggedInStatus = (
  //     <>
  //     <li><a href="/signup">Create Account</a> </li>
  //     <li><a href="/login">Login</a></li>
  //     </>
  //   )
  // }

  return (
    <header>
      <a href="/">Home</a> ||
      <a href="login">Login</a> ||
      <a href="signup">Create Account</a> ||
      <a href="/logout">Log Out</a> ||
      <a href="/users">Users</a> ||
      <a href="/films">Films</a> ||
      <a href="/actors">Actors</a> || 
      <a href="/directors">Directors</a> ||
      <a href="/genres">Genres</a> ||
      <a href="/reviews">Reviews</a> ||
      <a href="/reviews/new">New Review</a> ||
    </header>
  )
}