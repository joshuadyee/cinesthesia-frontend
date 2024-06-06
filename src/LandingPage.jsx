import { FilmsIndex } from "./FilmsIndex"
import { CurrentUser } from "./Utility/CurrentUser"

export function LandingPage({films}) {

  const currentUser = CurrentUser()
  const welcome = currentUser ? `Welcome back ${currentUser.username}!` : "Welcome to Cinesthesia!"

  return (
    <div className="p-3 flex-auto">
      <h1 className="text-center text-black text-7xl font-bold">{welcome}</h1>
      <FilmsIndex films={films} />
    </div>
  )
}