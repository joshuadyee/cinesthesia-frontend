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
      <div className="text-white ">
        <a href="/" className="text-blue-500 rounded-md p-1 hover:bg-gray-600 hover:text-white no-underline">HOME</a>| 
        <a href='/users' className="text-blue-500 rounded-md p-1 hover:bg-gray-600 hover:text-white no-underline">MEMBERS</a>|
        <a href='/films' className="text-blue-500 rounded-md p-1 hover:bg-gray-600 hover:text-white no-underline">FILMS</a>|
        <a href='/actors' className="text-blue-500 rounded-md p-1 hover:bg-gray-600 hover:text-white no-underline">ACTORS</a>| 
        <a href='/directors' className="text-blue-500 rounded-md p-1 hover:bg-gray-600 hover:text-white no-underline">DIRECTORS</a>|
        <a href='/genres' className="text-blue-500 rounded-md p-1 hover:bg-gray-600 hover:text-white no-underline">GENRES</a>|
        <a href='/reviews' className="text-blue-500 rounded-md p-1 hover:bg-gray-600 hover:text-white no-underline">REVIEWS</a>|
        <a href='/logout' className="text-blue-500 rounded-md p-1 hover:bg-gray-600 hover:text-white no-underline">LOG OUT</a>
      </div>
    )
  } else {
      loggedInStatus = (
        <div className="text-white">
          <Link to="/" className="text-blue-500 rounded-md p-1 hover:bg-gray-600 hover:text-white no-underline">Home</Link> ||
          <Link className="text-blue-500 rounded-md p-1 hover:bg-gray-600 hover:text-white no-underline" onClick={handleShowLoginModal}>Login</Link> ||  
          <Link className="text-blue-500 rounded-md p-1 hover:bg-gray-600 hover:text-white no-underline" onClick={handleShowSignupModal}>Signup</Link>
        </div>
      )
  }

  return (
    <header>
      <nav className="bg-gray-700 p-4 flex items-center text-center mx-auto justify-between">
        <Modal show={isLoginModalShowVisible} onClose={handleClose}>
          <Login />
        </Modal>
        <Modal show={isSignupModalShowVisible} onClose={handleClose}>
          <Signup />
        </Modal>

        {loggedInStatus}
      
      </nav>
    </header>
  )
}

