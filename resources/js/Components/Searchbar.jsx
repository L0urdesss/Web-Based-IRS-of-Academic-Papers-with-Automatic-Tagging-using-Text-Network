import React, { useState } from 'react';
import searchImage from './search.png';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(window.location = route('userpapers.view', { searchQuery: searchTerm }));
  };

  return (
    <div className="relative flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-full sm:w-3/4 md:w-1/2 lg:w-3/4 xl:w-3/4 relative">
        <div className="flex">
          <input
            type="text"
            placeholder="Search for author, title, topic..."
            value={searchTerm}
            onChange={handleChange}
            className="border border-red-300 rounded-md p-2 w-full outline-none focus:ring-1 focus:ring-white-600"
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
            }}
          >
            <span className="sr-only">Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
