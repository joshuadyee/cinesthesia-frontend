export function UserLinkBar() {
  return (
    <nav className="flex p-2 border-1 border-gray-400 bg-gray-700 rounded-md mb-4 ">
      <ul className="flex  justify-around items-center w-full my-auto">
        <li > 
          <a className="text-white no-underline inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" href="/userfilms">Films</a>
        </li>
        <li > 
          <a className="text-white no-underline inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" href="/userreviews">Reviews</a>
        </li>
        <li > 
          <a className="text-white no-underline inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" href="/">Watchlist</a>
        </li>
        <li > 
          <a className="text-white no-underline inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" href="/">Likes</a>
        </li>
      </ul>
    </nav>)
}


