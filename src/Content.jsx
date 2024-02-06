import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";
import { UsersIndex } from "./UsersIndex";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function Content() {

  const [users, setUsers] = useState([])

  const handleUsersIndex = () => {
    console.log("handle User index")
    axios.get("http://localhost:3000/users.json").then(response => {
      console.log(response.data)
      setUsers(response.data)
    })
  }

  useEffect(handleUsersIndex, [])

  return (
    <div>
      <h1>Welcome to Cinesthesia!!!</h1>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogoutLink />}/>
        <Route path="/users/index" element={<UsersIndex users={users} />}/>
      </Routes>
    </div>
  )
}