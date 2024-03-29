import { LogoutLink } from "./LogoutLink"
import { Login } from "./Login"
import { useState } from "react"
import { Signup } from "./Signup"
import { Modal } from "./Modal"

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
          ||
          <button onClick={handleShowSignupModal}>Signup</button>
        </>
      )
  }

  return (
    <header>
      <a href="/">Home</a> || {loggedInStatus}
      <Modal show={isLoginModalShowVisible} onClose={handleClose}>
        <Login />
      </Modal>
      <Modal show={isSignupModalShowVisible} onClose={handleClose}>
        <Signup />
      </Modal>
    
    </header>
  )
}