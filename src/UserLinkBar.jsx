export function UserLinkBar() {
  return (
    <nav className="flex justify-around p-3 border-1 text-white">
      <ul className="flex">
        <li className="mr-3"> 
          <a className="text-white no-underline inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500" href="/userfilms">Films</a>
        </li>
        <li className="mr-3"> 
          <a className="text-white no-underline inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500" href="/userreviews">Reviews</a>
        </li>
      </ul>
    </nav>)
}


