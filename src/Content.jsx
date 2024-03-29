import { LandingPage } from "./LandingPage";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";
import { UsersIndex } from "./UsersIndex";
import { UsersShow } from "./UsersShow";
import { UserReviewsIndex } from "./UserReviewsIndex";
import { UserReviewsNew } from "./UserReviewsNew";
import { UserProfile } from "./UserProfile";
import { FilmsIndex } from "./FilmsIndex";
import { FilmsShow } from "./FilmsShow";
import { ActorsIndex } from "./ActorsIndex";
import { ActorsShow } from "./ActorsShow";
import { DirectorsIndex } from "./DirectorsIndex";
import { DirectorsShow } from "./DirectorsShow";
import { GenresIndex } from "./GenresIndex";
import { GenresShow } from "./GenresShow";
import { Welcome } from "./Welcome";
import { Modal } from "./Modal";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


export function Content() {

  const [user, setUser] = useState([])
  const [films, setFilms] = useState([])
  const [userReviews, setUserReviews] = useState([])

  const [isActorsShowVisible, setIsActorsShowVisible] = useState(false)
  const [isDirectorsShowVisible, setIsDirectorsShowVisible] = useState(false)
  const [isGenresShowVisible, setIsGenresShowVisible] = useState(false)

  const [currentActor, setCurrentActor] = useState({})
  const [currentDirector, setCurrentDirector] = useState({})
  const [currentGenre, setCurrentGenre] = useState({})


  const handleFilmsIndex = () => {
    axios.get("http://localhost:3000/films.json").then(response => {
      console.log("Films Index", response.data)
      setFilms(response.data)
    })
  }

  const handleCreateUserReview = (params, successCallback) => {
    // console.log("handle create userReview", params)
    axios.post("http://localhost:3000/film_users.json", params).then(response => {
      setUserReviews([...userReviews, response.data])
      successCallback()
    })
  }

  const handleShowDirector = director => {
    // console.log("showing director", director)
    setIsDirectorsShowVisible(true)
    setCurrentDirector(director)
  }

  const handleShowActor = actor => {
    // console.log("showing actor", actor)
    setIsActorsShowVisible(true)
    setCurrentActor(actor)
  }

  const handleShowGenre = genre => {
    // console.log("showing genre", genre)
    setIsGenresShowVisible(true)
    setCurrentGenre(genre)
  }

  const handleClose = () => {
    // console.log("handle Close")
    setIsActorsShowVisible(false)
    setIsDirectorsShowVisible(false)
    setIsGenresShowVisible(false)
  }

  useEffect(handleFilmsIndex, [])

  return (
    <div>
      <Modal show={isActorsShowVisible} onClose={handleClose}>
        <ActorsShow actor={currentActor}/>
      </Modal>

      <Modal show={isDirectorsShowVisible} onClose={handleClose}>
        <DirectorsShow director={currentDirector}/>
      </Modal>

      <Modal show={isGenresShowVisible} onClose={handleClose}>
        <GenresShow genre={currentGenre}/>
      </Modal>

      <Routes>
        <Route path="/" element={<LandingPage films={films}/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />}/>
        <Route path="/profile" element={<UserProfile user={user}/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogoutLink />}/>
        <Route path="/users" element={<UsersIndex />}/>
        <Route path="/users/:id" element={<UsersShow films={films} />}/>
        <Route path="/films" element={<FilmsIndex films={films}/>}/>
        <Route path="/films/:id" element={<FilmsShow />}/>
        <Route path="/actors" element={<ActorsIndex onShowActor={handleShowActor}/>}/>
        <Route path="/directors" element={<DirectorsIndex onShowDirector={handleShowDirector}/>}/>
        <Route path="/genres" element={<GenresIndex onShowGenre={handleShowGenre}/>}/>
        <Route path="/reviews" element={<UserReviewsIndex/>}/>
        <Route path="/reviews/new" element={<UserReviewsNew onCreateUserReview={handleCreateUserReview}/>}/>
      </Routes>
    </div>
  )
}