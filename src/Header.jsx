import { LogoutLink } from "./LogoutLink"
import { LoginModal } from "./LoginModal"
import { Login } from "./Login"
import { useState } from "react"
import { Signup } from "./Signup"
import { SignupModal } from "./SignupModal"

export function Header() {

  const [isLoginModalShowVisible, setIsLoginModalShowVisible] = useState(false)
  const [isSignupModalShowVisible, setIsSignupModalShowVisible] = useState(false)
  
  const handleShowLoginModal = () => {
    setIsLoginModalShowVisible(true)
  }

  const handleShowSignupModal = () => {
    setIsSignupModalShowVisible(true)
  }
  
  const handleClose = () => {
    setIsLoginModalShowVisible(false)
    setIsSignupModalShowVisible(false)
  }

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
          <button onClick={handleShowLoginModal}>Login</button>
          {/* <a href="/login">Login</a> */}
          ||
          <button onClick={handleShowSignupModal}>Signup</button>
          {/* <a href="/signup">Create Account</a>  */}
        </>
      )
  }

  return (
    <header>
      <a href="/">Home</a> || {loggedInStatus}
      <LoginModal show={isLoginModalShowVisible} onClose={handleClose}>
        <Login />
      </LoginModal>
      <SignupModal show={isSignupModalShowVisible} onClose={handleClose}>
        <Signup />
      </SignupModal>
    
    </header>
  )
}