import { LandingPage } from "./LandingPage";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";
import { UsersIndex } from "./UsersIndex";
import { UsersShow } from "./UsersShow";
import { UserReviewsIndex } from "./UserReviewsIndex";
import { UserReviewsNew } from "./UserReviewsNew";
import { UserProfile } from "./UserProfile";
import { UserFilms } from "./UserFilms";
import { FilmsIndex } from "./FilmsIndex";
import { FilmsShow } from "./FilmsShow";
import { ActorsIndex } from "./ActorsIndex";
import { DirectorsIndex } from "./DirectorsIndex";
import { GenresIndex } from "./GenresIndex";
import { Welcome } from "./Welcome";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserReviews } from "./UserReviews";
import { Sandbox } from "./sandbox";
import { CurrentUser } from "./Utility/CurrentUser";


export function Content() {
  const [films, setFilms] = useState([])
  const [userReviews, setUserReviews] = useState([])

  const handleFilmsIndex = () => {
    axios.get("http://localhost:3000/films.json").then(response => {
      // console.log("Films Index", response.data)
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

  const currentUser = CurrentUser()

  useEffect(handleFilmsIndex, [])

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage films={films}/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />}/>
        <Route path="/profile" element={<UserProfile films={films} currentUser={currentUser}/>}/>
        <Route path="/userfilms" element={<UserFilms currentUser={currentUser}/>}/>
        <Route path="/userreviews" element={<UserReviews currentUser={currentUser}/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogoutLink />}/>
        <Route path="/users" element={<UsersIndex />}/>
        <Route path="/users/:id" element={<UsersShow films={films} />}/>
        <Route path="/films" element={<FilmsIndex films={films}/>}/>
        <Route path="/films/:id" element={<FilmsShow />}/>
        <Route path="/actors" element={<ActorsIndex />}/>
        <Route path="/directors" element={<DirectorsIndex/>}/>
        <Route path="/genres" element={<GenresIndex/>}/>
        <Route path="/reviews" element={<UserReviewsIndex/>}/>
        <Route path="/sandbox" element={<Sandbox />}/>
      </Routes>
    </div>
  )
}