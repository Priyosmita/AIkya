import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      setQuery(''); // Clear the input field after searching
    }
  };

  return (
    <div className='relative pt-4 mb-4 text-black'>
      <button
        onClick={handleSearch}
        className='pb-2 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
      >
        <FaSearch />
      </button>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search people, posts..."
        className="pl-10 p-2 border rounded-full w-101"
      />
    </div>
  );
}

export default Search;