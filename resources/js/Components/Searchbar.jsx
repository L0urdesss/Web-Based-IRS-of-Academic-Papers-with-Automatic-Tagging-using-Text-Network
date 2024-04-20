import React, { useState } from 'react';
import searchImage from './search.png';

const SearchBar = ({ onSearch, searchQuery }) => {
  const [searchTerm, setSearchTerm] = useState(searchQuery || '');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onSearch function with searchTerm
    onSearch(searchTerm);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative rounded-full overflow-hidden">
      <input
        type="text"
        placeholder="Search for author, title, topic..."
        value={searchTerm}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`p-2 w-full outline-none ${
          isFocused ? 'focus:border-red-700 focus:border-2' : 'border-red-700'
        } rounded-full`}
        style={{ paddingLeft: '3rem' }}
      />
      <button
        type="submit"
        className="bg-none text-red-600 rounded-full p-2 absolute inset-y-0 right-2"
        style={{
          backgroundImage: `url(${searchImage})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '2.5rem',
          height: '100%',
        }}
      >
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
};

export default SearchBar;
