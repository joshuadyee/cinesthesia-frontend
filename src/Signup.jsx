import axios from "axios";
import { useState } from "react";

export function Signup() {
  const [errors, setErrors] = useState([]);

  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        event.target.reset();
        window.location.href = "/welcome"; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup" className="w-full max-w-xs mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto">
        <h1>Signup</h1>
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="mb-2">
          <label htmlFor="email" className="block text-gray-700 text-sm text-left font-bold mb-2">
            Email
          </label>
          <input name="email" type="email" className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="username" className="block text-gray-700 text-sm text-left font-bold mb-2">
            Username
          </label>
          <input name="username" type="text" className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="block text-gray-700 text-sm text-left font-bold mb-2">
            Password
          </label>
          <input name="password" type="password" className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div >
          <label htmlFor="password_confirmation" className="block text-gray-700 text-sm text-left font-bold mb-2">
            Password Confirmation
          </label>
          <input name="password_confirmation" type="password" className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div className="container py-4 px-10 mx-0 min-w-full flex flex-col items-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}