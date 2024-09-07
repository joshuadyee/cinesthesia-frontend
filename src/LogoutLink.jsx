import axios from "axios";

export function LogoutLink() {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  return (
    <a href="#" onClick={handleClick} className="text-sky-300 text-xl rounded-md p-1 hover:bg-gray-600 hover:text-white no-underline">
      LOGOUT
    </a>
  );
}