import axios from "axios";
import { useState } from "react";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function Login() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        event.target.reset();
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response);
        alert("Invalid email or password");
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div id="login" className="w-full max-w-xs mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto">
        <h1 className="text-black">Sign In</h1>
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="mb-4">
          <label className="block text-gray-700 text-left text-sm font-bold mb-2" htmlFor="email" >
            Email
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer" name="email" 
            type="email" 
            placeholder="Email" 
            required
          />          
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-left text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="password" 
            type="password" 
            placeholder="********"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit">Login</button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 no-underline" href="/">Forgot Password?</a>
        </div>
      </form>
    </div>
  );
}

