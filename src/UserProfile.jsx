import axios from 'axios';
import { useEffect, useState } from 'react';

const useCurrentUser = (user) => {        // function useCurrentUser 
  // const [currentUser, setCurrentUser] = useState({});   // declares variable currentUser

  useEffect(() => {         // 
    const token = localStorage.getItem('jwt'); // sets var token to the value of 'jwt'
    if (token) {        // if token is present (logged in)
      axios.get(`http://localhost:3000/users/${user.id}`, { //axios request
        headers: {
          Authorization: `Bearer ${token}` // fills in the token variable with currentUser token
        }
      })
      .then(response => setCurrentUser(response.data))  // populates setCurrentUser object with data from response  
      .catch(error => console.error("Error fetching current user", error)); // error handling
    }
  }, []);

  return user; // returns currentUser obj
};

export const UserProfile = ({user}) => {    // exports the function UserProfile
  const currentUser = useCurrentUser(user);  // declaring currentUser variable to value of the function useCurrentUser()

  if (!currentUser) { // if currentUser is null
    return <div>Loading...</div>; // return loading screen
  }

  return (    // otherwise return the user profile
    <div>
      <h1>User Profile</h1>
      <p>Name: {currentUser.name}</p>
      <p>Email: {currentUser.email}</p>
    </div>
  );
};