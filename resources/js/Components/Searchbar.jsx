import React, { useState } from 'react';
import searchImage from './search.png';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false); // To toggle filter visibility
  const [filters, setFilters] = useState({
    title: false,
    author: false,
    date_published: false
  });

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters({
      ...filters,
      [name]: checked
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onSearch function with searchTerm and filters
    onSearch(searchTerm, filters);
  };

  return (
      <form onSubmit={handleSubmit} className="w-full sm:w-3/4 md:w-1/2 lg:w-3/4 xl:w-3/4 relative">
        <div className="flex">
          <button
            type="button"
            onClick={handleFilterClick}
            className="bg-none text-red-600 border-none rounded-md p-2 ml-2"
          >
            Filter


          </button>
          {showFilter && (
            <div className="absolute mt-8 bg-white border border-gray-300 rounded-md p-2 flex flex-col">
              <label>
                <input
                  type="checkbox"
                  name="title"
                  checked={filters.title}
                  onChange={handleCheckboxChange}
                />
                Title
              </label>
              <label>
                <input
                  type="checkbox"
                  name="author"
                  checked={filters.author}
                  onChange={handleCheckboxChange}
                />
                Author
              </label>
              <label>
                <input
                  type="checkbox"
                  name="date_published"
                  checked={filters.date_published}
                  onChange={handleCheckboxChange}
                />
                Date Published
              </label>
            </div>
          )}
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
  );
};

export default SearchBar;
