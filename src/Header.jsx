import { LogoutLink } from "./LogoutLink"
import { Login } from "./Login"
import { useState } from "react"
import { Signup } from "./Signup"
import { Modal } from "./Modal"
import { Link } from "react-router-dom"

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
      <div className="flex space-x-2">
        <Link to="/" className="text-black mr-2">Home</Link> ||
        <Link to='/users' className="text-black">Members</Link> ||
        <Link to='/films' className="text-black">Films</Link> ||
        <Link to='/actors' className="text-black">Actors</Link> || 
        <Link to='/directors' className="text-black">Directors</Link> ||
        <Link to='/genres' className="text-black">Genres</Link> ||
        <Link to='/reviews' className="text-black">Reviews</Link> ||
        <Link to='/logout' className="text-black">Log Out</Link>
      </div>
    )
  } else {
      loggedInStatus = (
        <div className="flex space-x-2">
          <Link to="/" className="text-black mr-2">Home</Link> ||
          <Link className="text-black" onClick={handleShowLoginModal}>Login</Link> || 
          <Link className="text-black" onClick={handleShowSignupModal}>Signup</Link>
        </div>
      )
  }

  return (
    <nav className="bg-teal-500 p-6 flex items-center justify-between">
      <Modal show={isLoginModalShowVisible} onClose={handleClose}>
        <Login />
      </Modal>
      <Modal show={isSignupModalShowVisible} onClose={handleClose}>
        <Signup />
      </Modal>

      {loggedInStatus}
    
    </nav>
  )
}