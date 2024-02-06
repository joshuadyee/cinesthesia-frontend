import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";
import { UsersIndex } from "./UsersIndex";
import { FilmsIndex } from "./FilmsIndex";
import { FilmsShow } from "./FilmsShow";
import { Modal } from "./Modal";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function Content() {

  const [users, setUsers] = useState([])

  // const films = [
  //   {title: "Interstellar", year: 2014, runtime: 169, logline: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans"}
  // ]
  const [films, setFilms] = useState([])

  const [isFilmsShowVisible, setIsFilmsShowVisible] = useState(false)

  const [currentFilm, setCurrentFilm] = useState({})

  const handleUsersIndex = () => {
    console.log("handle User index")
    axios.get("http://localhost:3000/users.json").then(response => {
      // console.log(response.data)
      setUsers(response.data)
    })
  }

  const handleFilmsIndex = () => {
    console.log("handle Films Index")
    axios.get("http://localhost:3000/films.json").then(response => {
      // console.log(response.data)
      setFilms(response.data)
    })
  }

  const handleShowFilm = film => {
    console.log("showing film", film)
    setIsFilmsShowVisible(true)
    setCurrentFilm(film)
  }

  const handleClose = () => {
    console.log("handle Close")
    setIsFilmsShowVisible(false)
  }


  useEffect(handleUsersIndex, [])

  useEffect(handleFilmsIndex, [])

  return (
    <div>
      <h1>Cinesthesia</h1>
      <Modal show={isFilmsShowVisible} onClose={handleClose}>
        <FilmsShow film={currentFilm} />
      </Modal>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogoutLink />}/>
        <Route path="/users/index" element={<UsersIndex users={users} />}/>
        <Route path="/films/index" element={<FilmsIndex films={films} onShowFilm={handleShowFilm} />}/>
      </Routes>
    </div>
  )
}