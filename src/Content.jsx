import { LandingPage } from "./LandingPage";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";
import { UsersIndex } from "./UsersIndex";
import { FilmsIndex } from "./FilmsIndex";
import { FilmsShow } from "./FilmsShow";
import { FilmsModal } from "./FilmModal";
import { ActorsIndex } from "./ActorsIndex";
import { ActorsShow } from "./ActorsShow";
import { ActorsModal } from "./ActorsModal";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function Content() {

  const [users, setUsers] = useState([])

  // const films = [
  //   {title: "Interstellar", year: 2014, runtime: 169, logline: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans"}
  // ]
  const [films, setFilms] = useState([])

  const [actors, setActors] = useState([])

  const [isFilmsShowVisible, setIsFilmsShowVisible] = useState(false)

  const [isActorsShowVisible, setIsActorsShowVisible] = useState(false)

  const [currentFilm, setCurrentFilm] = useState({})

  const [currentActor, setCurrentActor] = useState({})

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

  const handleActorsIndex = () => {
    console.log("handle actors index")
    axios.get("http://localhost:3000/cast.json").then(response => {
      console.log(response.data)
      setActors(response.data)
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
    setIsActorsShowVisible(false)
  }

  const handleShowActor = actor => {
    console.log("showing actor", actor)
    setIsActorsShowVisible(true)
    setCurrentActor(actor)
  }


  useEffect(handleUsersIndex, [])

  useEffect(handleFilmsIndex, [])

  useEffect(handleActorsIndex, [])

  return (
    <div>
      <FilmsModal show={isFilmsShowVisible} onClose={handleClose}>
        <FilmsShow film={currentFilm} />
      </FilmsModal>

      <ActorsModal show={isActorsShowVisible} onClose={handleClose}>
        <ActorsShow actor={currentActor}/>
      </ActorsModal>

      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogoutLink />}/>
        <Route path="/users/index" element={<UsersIndex users={users} />}/>
        <Route path="/films/index" element={<FilmsIndex films={films} onShowFilm={handleShowFilm} />}/>
        <Route path="/actors/index" element={<ActorsIndex actors={actors} onShowActor={handleShowActor}/>}/>
      </Routes>
    </div>
  )
}