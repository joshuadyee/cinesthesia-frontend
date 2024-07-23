import { LandingPage } from "./LandingPage";
import { Signup } from "./Signup";
import { LogoutLink } from "./LogoutLink";
import { UsersIndex } from "./UsersIndex";
import { UsersShow } from "./UsersShow";
import { UserReviewsIndex } from "./UserReviewsIndex";
import { UserProfile } from "./UserProfile";
import { UserReviews } from "./UserReviews";
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
import { CurrentUser } from "./Utility/CurrentUser";


export function Content() {
  const [films, setFilms] = useState([])
  const currentUser = CurrentUser()

  const handleFilmsIndex = () => {
    axios.get("http://localhost:3000/films.json").then(response => {
      // console.log("Films Index", response.data)
      setFilms(response.data)
    })
  }

  useEffect(handleFilmsIndex, [])

  return (
    <main className="flex flex-col min-h-screen text-slate-100 font-serif bg-gradient-to-r from-indigo-900 from-10% via-indigo-700 via-30% to-emerald-900 to-90%">
      <div className="container mx-auto">
      <Routes>
        <Route path="/" element={<LandingPage films={films}/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />}/>
        <Route path="/profile" element={<UserProfile films={films} currentUser={currentUser}/>}/>
        <Route path="/userfilms" element={<UserFilms currentUser={currentUser}/>}/>
        <Route path="/userreviews" element={<UserReviews currentUser={currentUser}/>}/>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/logout" element={<LogoutLink />}/>
        <Route path="/users" element={<UsersIndex />}/>
        <Route path="/users/:id" element={<UsersShow films={films} />}/>
        <Route path="/films" element={<FilmsIndex films={films}/>}/>
        <Route path="/films/:id" element={<FilmsShow />}/>
        <Route path="/actors" element={<ActorsIndex />}/>
        <Route path="/directors" element={<DirectorsIndex/>}/>
        <Route path="/genres" element={<GenresIndex/>}/>
        <Route path="/reviews" element={<UserReviewsIndex/>}/>
      </Routes>
      </div>
    </main>
  )
}