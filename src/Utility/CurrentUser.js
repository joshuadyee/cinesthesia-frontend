import { jwtDecode } from "jwt-decode"

export function CurrentUser() {
  const jwt = localStorage.getItem("jwt")
  let currentUser = null

  if (jwt) {
    try {
      currentUser = jwtDecode(jwt)
    } catch (error) {
      console.error("Token is invalid", error)
    } finally {
      return currentUser.user_id
    }
  }
}