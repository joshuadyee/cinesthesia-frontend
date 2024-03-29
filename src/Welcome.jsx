import { Link } from "react-router-dom"

export function Welcome() {
  return (
    <>
      <h1>Welcome!</h1>
      <h2>
        Cinesthesia lets you track every film you've ever seen and share your thoughts with other cinema enthusiasts.
      </h2>
      <Link to="/profile">To Your Profile</Link>
    </>
  )
}