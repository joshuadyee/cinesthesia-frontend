import { LogoutLink } from "./components/auth/LogoutLink"
import { Login } from "./components/auth/Login"
import { useState } from "react"
import { Signup } from "./components/auth/Signup"
import { Modal } from "./Modal"
import { Link } from "react-router-dom"
import { CurrentUser } from "./utils/CurrentUser"

export function Header() {

  const [isLoginModalShowVisible, setIsLoginModalShowVisible] = useState(false)
  const [isSignupModalShowVisible, setIsSignupModalShowVisible] = useState(false)
  const currentUser = CurrentUser()

  
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

  let loggedInStatus = localStorage.jwt? (
      <ul className="flex space-x-4">
        <li>
          <a href="/profile" className="inline text-sky-300 text-xl p-1 hover:text-white no-underline" >
          {currentUser.username.toUpperCase()}
         </a>
        </li>
        <li>
          <a href='/users' className="text-sky-300 text-xl p-1 hover:text-white no-underline">
            MEMBERS
          </a>
        </li>
        <li>
          <a href='/films' className="text-sky-300 text-xl p-1 hover:text-white no-underline">
            FILMS
          </a>
        </li>
        {/* <a href='/actors' className="text-sky-300 p-1 hover:text-white no-underline">ACTORS</a> 
        <a href='/directors' className="text-sky-300 p-1 hover:text-white no-underline">DIRECTORS</a>
        <a href='/genres' className="text-sky-300 p-1 hover:text-white no-underline">GENRES</a> */}
        <li>
          <a href='/reviews' className="text-sky-300 text-xl p-1 hover:text-white no-underline">
            REVIEWS
          </a>
        </li>
        <li>
          <LogoutLink/>
        </li>
      </ul>
    ) : (
      <ul className="flex justify-start space-x-4">
        <li>
          <Link className="text-sky-300 text-xl p-1 hover:text-white no-underline " onClick={handleShowLoginModal}>LOGIN</Link> 
        </li>
        <li>
          <Link className="text-sky-300 text-xl p-1 hover:text-white no-underline" onClick={handleShowSignupModal}>SIGNUP</Link>
        </li>
      </ul>
      )

  return (
    <header className="bg-gray-700 flex p-4 justify-around">
      <section className="w-11/12 flex">
        <h1 className="px-4 py-2">
          <a href="/" className="no-underline uppercase text-sky-300 rounded-lg hover:ring-4 hover:ring-blue-500 hover:bg-sky-300 hover:text-purple-700">
            Cinesthesia
          </a>
        </h1> 
        <nav className="w-full flex items-end justify-end pt-1">
          <Modal show={isLoginModalShowVisible} onClose={handleClose}>
            <Login />
          </Modal>
          <Modal show={isSignupModalShowVisible} onClose={handleClose}>
            <Signup />
          </Modal>
          {loggedInStatus}
        </nav>
      </section>
    </header>
  )
}

