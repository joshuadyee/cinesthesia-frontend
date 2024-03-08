import { FilmsIndex } from "./FilmsIndex"

export function LandingPage({films}) {
  return (
    <div className="landingPageContainer">
      <h1 className="landingPageTitle">WELCOME TO CINESTHESIA</h1>
      <FilmsIndex films={films} />
    </div>
  )
}