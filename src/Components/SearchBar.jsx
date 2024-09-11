import React, { useEffect, useState, useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

export const SearchBar = ({searchFilter, setSearchFilter, placeholder}) => {

  const [isSearchVisible, setIsSearchVisible] = useState(false)

  let searchRef = useRef()

  // Set search filter to the value of the input field
  const handleInputChange = event => {
    const value = event.target.value
    setSearchFilter(value)
  }

  // Close search bar when clicking outside of it
  useEffect(() => {
    let handler = (e) => {
      if (!searchRef.current.contains(e.target)) { // If the target of the click is not the search bar
        setIsSearchVisible(false) // Close the search bar
      }
    }
    document.addEventListener("mousedown", handler) // Add event listener to the document

    return() => {
      document.removeEventListener("mousedown", handler) // Remove event listener when component unmounts
    }
  })

  return (
    <form className="">
      <div className='flex' ref={searchRef}>
        {!isSearchVisible && ( // If search is not visible, show search icon
          <FaSearch
            className="cursor-pointer inherit text-3xl duration-1000"
            onClick={() => setIsSearchVisible(true)}
          />
        )}
        {isSearchVisible && ( // If search is visible, show input field
          <div className="flex items-center">
            <input
              placeholder={`Search by ${placeholder}`}
              type="text"
              value={searchFilter}
              onChange={handleInputChange}
              className="text-black w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            
            <button
              type="button"
              className="ml-2 inherit"
              onClick={() => setIsSearchVisible(false)}
            >
              <FaTimes /> {/* Close button */}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
