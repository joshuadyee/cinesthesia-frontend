import { FilmsIndex } from "./FilmsIndex"

export function LandingPage({films}) {
  return (
    <div className="p-3 flex-auto">
      <h1 className="text-center text-5xl font-bold">WELCOME TO CINESTHESIA</h1>
      <FilmsIndex films={films} />
    </div>
  )
}