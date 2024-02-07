import { LandingPage } from "./LandingPage";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";
import { UsersIndex } from "./UsersIndex";
import { UsersShow } from "./UsersShow";
import { UsersModal } from "./UsersModal";
import { FilmsIndex } from "./FilmsIndex";
import { FilmsShow } from "./FilmsShow";
import { FilmsModal } from "./FilmsModal";
import { ActorsIndex } from "./ActorsIndex";
import { ActorsShow } from "./ActorsShow";
import { ActorsModal } from "./ActorsModal";
import { DirectorsIndex } from "./DirectorsIndex";
import { DirectorsShow } from "./DirectorsShow";
import { DirectorsModal } from "./DirectorsModal";
import { GenresIndex } from "./GenresIndex";
import { GenresShow } from "./GenresShow";
import { GenresModal } from "./GenresModal";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


export function Content() {

  const [users, setUsers] = useState([])
  const [films, setFilms] = useState([])
  const [actors, setActors] = useState([])
  const [directors, setDirectors] = useState([])
  const [genres, setGenres] = useState([])

  const [isUsersShowVisible, setIsUsersShowVisible] = useState(false)
  const [isFilmsShowVisible, setIsFilmsShowVisible] = useState(false)
  const [isActorsShowVisible, setIsActorsShowVisible] = useState(false)
  const [isDirectorsShowVisible, setIsDirectorsShowVisible] = useState(false)
  const [isGenresShowVisible, setIsGenresShowVisible] = useState(false)

  const [currentUser, setCurrentUser] = useState({})
  const [currentFilm, setCurrentFilm] = useState({})
  const [currentActor, setCurrentActor] = useState({})
  const [currentDirector, setCurrentDirector] = useState({})
  const [currentGenre, setCurrentGenre] = useState({})

  const handleUsersIndex = () => {
    // console.log("handle User index")
    axios.get("http://localhost:3000/users.json").then(response => {
      console.log(response.data)
      setUsers(response.data)
    })
  }

  const handleFilmsIndex = () => {
    // console.log("handle Films Index")
    axios.get("http://localhost:3000/films.json").then(response => {
      console.log(response.data)
      setFilms(response.data)
    })
  }

  const handleActorsIndex = () => {
    // console.log("handle actors index")
    axios.get("http://localhost:3000/cast.json").then(response => {
      // console.log(response.data)
      setActors(response.data)
    })
  }

  const handleDirectorsIndex = () => {
    // console.log("directors Index")
    axios.get("http://localhost:3000/directors.json").then(response => {
      console.log(response.data)
      setDirectors(response.data)
    })
  }

  const handleGenresIndex = () => {
    // console.log("genres index")
    axios.get("http://localhost:3000/genres.json").then(response => {
      console.log(response.data)
      setGenres(response.data)
    })
  }

  const handleShowUser = user => {
    console.log("showing user", user)
    setIsUsersShowVisible(true)
    setCurrentUser(user)
  }
  
  const handleShowFilm = film => {
    console.log("showing film", film)
    setIsFilmsShowVisible(true)
    setCurrentFilm(film)
  }
  
  const handleShowActor = actor => {
    console.log("showing actor", actor)
    setIsActorsShowVisible(true)
    setCurrentActor(actor)
  }

  const handleShowDirector = director => {
    console.log("showing director", director)
    setIsDirectorsShowVisible(true)
    setCurrentDirector(director)
  }

  const handleShowGenre = genre => {
    console.log("showing genre", genre)
    setIsGenresShowVisible(true)
    setCurrentGenre(genre)
  }

  const handleClose = () => {
    console.log("handle Close")
    setIsUsersShowVisible(false)
    setIsFilmsShowVisible(false)
    setIsActorsShowVisible(false)
    setIsDirectorsShowVisible(false)
    setIsGenresShowVisible(false)
  }


  useEffect(handleUsersIndex, [])

  useEffect(handleFilmsIndex, [])

  useEffect(handleActorsIndex, [])

  useEffect(handleDirectorsIndex, [])

  useEffect(handleGenresIndex, [])

  return (
    <div>
      <UsersModal show={isUsersShowVisible} onClose={handleClose}>
        <UsersShow user={currentUser} />
      </UsersModal>

      <FilmsModal show={isFilmsShowVisible} onClose={handleClose}>
        <FilmsShow film={currentFilm} />
      </FilmsModal>

      <ActorsModal show={isActorsShowVisible} onClose={handleClose}>
        <ActorsShow actor={currentActor}/>
      </ActorsModal>

      <DirectorsModal show={isDirectorsShowVisible} onClose={handleClose}>
        <DirectorsShow director={currentDirector}/>
      </DirectorsModal>

      <GenresModal show={isGenresShowVisible} onClose={handleClose}>
        <GenresShow genre={currentGenre}/>
      </GenresModal>

      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogoutLink />}/>
        <Route path="/users/index" element={<UsersIndex users={users} onShowUser={handleShowUser}/>}/>
        <Route path="/films/index" element={<FilmsIndex films={films} onShowFilm={handleShowFilm} />}/>
        <Route path="/actors/index" element={<ActorsIndex actors={actors} onShowActor={handleShowActor}/>}/>
        <Route path="/directors/index" element={<DirectorsIndex directors={directors} onShowDirector={handleShowDirector}/>}/>
        <Route path="/genres/index" element={<GenresIndex genres={genres} onShowGenre={handleShowGenre}/>}/>
      </Routes>
    </div>
  )
}