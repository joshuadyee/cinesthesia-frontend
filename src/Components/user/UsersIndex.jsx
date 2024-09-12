import axios from "axios"
import { useEffect, useState } from "react"
import { SearchBar } from "../../components/SearchBar"
import { IoEyeOutline } from "react-icons/io5"
import { MdOutlineReviews } from "react-icons/md"
import { FaRegThumbsUp } from "react-icons/fa"

export function UsersIndex() {
  const [searchFilter, setSearchFilter] = useState("")

  const [users, setUsers] = useState([])

  const handleUsersIndex = () => {
    axios.get("http://localhost:3000/users.json").then(response => {
      console.log("users index", response.data)
      setUsers(response.data)
    })
  }

  const reviewCount = (filmUsers) => {
    return filmUsers.filter(filmUser => filmUser.review !== null).length
  }

  useEffect(handleUsersIndex, [])

  return (
    <section className="py-16 px-8">
      <div className="flex justify-between mb-4">
        <h1 className="text-4xl font-semibold text-center">
          Fellow Film Fans and Critics
        </h1>
        <SearchBar 
          searchFilter={searchFilter} // Pass searchFilter state to SearchBar component
          setSearchFilter={setSearchFilter} // Pass setSearchFilter function to SearchBar component
          placeholder={"Username"} 
        />
      </div>
      {users
        .filter(user => 
          user.username.toLowerCase().includes(searchFilter.toLowerCase()))
        .map(user => (
      <div key={user.id} className="flex flex-col">
        <div className="flex mb-2" >
          <img src={user.profile_picture} className="w-14 h-14 object-contain rounded-full border-1 border-white mr-4"/>
          <h3 className="text-3xl content-center ">
            <a href={`/users/${user.id}`} className=" text-white no-underline hover:!text-sky-400">
              {user.username}
            </a>
          </h3>
          <div className="w-full flex justify-evenly ">
            <a href={`/userfilms`} className="content-center no-underline text-inherit hover:text-sky-400">
              <span className="flex gap-2 items-center">
                <IoEyeOutline className="text-4xl"/> {user.film_users.length}
              </span>
            </a>
            <a href={`/userreviews`} className="content-center no-underline text-inherit hover:text-sky-400">
            <span className="flex gap-2 items-center">
              <MdOutlineReviews className="text-3xl"/> {reviewCount(user.film_users)}
            </span>
            </a>
            <a href="/" className="content-center no-underline text-inherit hover:text-sky-400">
              <FaRegThumbsUp className="text-2xl"/>
            </a>
          </div>
        </div>
        {/* Activity Div */}
        <div className="text-slate-300"> 
          <h3 className="text-2xl">Recent Activity</h3>
            <ul >
              {user.film_users
              .slice(0, 2)
              .map((film_user, i) => (
                <div key={i}>
                  <a href={`/films/${film_user.film_id}`} className="flex items-center no-underline text-inherit text-xl hover:text-sky-400 content-center w-fit mb-2">
                    <img src={film_user.film_poster} alt="film_poster" className="w-12 h-12 object-contain rounded-2xl shadow-md mr-2" />
                    {film_user.film}
                  </a>
                  <p className="indent-4">"{film_user.review}"</p>
                </div>
              ))}
            </ul>
        </div>
          <hr />
      </div>
      ))}
    </section>
  )
}