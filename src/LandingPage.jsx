import { FilmsIndex } from "./FilmsIndex"
import { CurrentUser } from "./utils/CurrentUser"

export function LandingPage({films}) {

  const currentUser = CurrentUser()
  const welcome = currentUser ? `Welcome back ${currentUser.username}!` : "Welcome to Cinesthesia!"

  return (
    <div className="pt-16">
      <h1 className="text-center text-inherit text-7xl font-bold">
        {welcome}
      </h1>
      <FilmsIndex films={films} />
    </div>
  )
}