import React, { useState } from 'react';
import searchImage from './search.png';

const SearchBar = ({ onSearch, searchQuery }) => {
  const [searchTerm, setSearchTerm] = useState(searchQuery || '');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onSearch function with searchTerm
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full sm:w-3/4 md:w-1/2 lg:w-3/4 xl:w-3/4 relative">
      <div className="flex">
        <input
          type="text"
          placeholder="Search for author, title, topic..."
          value={searchTerm}
          onChange={handleChange}
          className="border border-red-300 rounded-full p-2 w-full outline-none focus:ring-1 focus:ring-white-600"
          style={{ paddingLeft: '1rem' }}
        />
        <button
          type="submit"
          className="bg-none text-red-600 border-none rounded-md p-2 absolute right-0"
          style={{
            backgroundImage: `url(${searchImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '2.5rem',
            height: '2.5rem',
            marginRight: '0.5rem', // Add margin to move the search icon to the left
          }}
        >
          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
