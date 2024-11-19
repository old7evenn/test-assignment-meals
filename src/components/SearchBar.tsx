import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface SearchBarProps {
  onSearch: (query: string) => void;
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search meals..."
          className="border border-gray-300 p-2 rounded w-full focus:outline-none"
        />
        <Link to="/selecrted-meals">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 48 48"
          >
            <path d="M 16.5 5 C 12.928062 5 10 7.9280619 10 11.5 L 10 41.5 A 1.50015 1.50015 0 0 0 12.376953 42.716797 L 24 34.347656 L 35.623047 42.716797 A 1.50015 1.50015 0 0 0 38 41.5 L 38 11.5 C 38 7.9280619 35.071938 5 31.5 5 L 16.5 5 z M 16.5 8 L 31.5 8 C 33.450062 8 35 9.5499381 35 11.5 L 35 38.572266 L 24.876953 31.283203 A 1.50015 1.50015 0 0 0 23.123047 31.283203 L 13 38.572266 L 13 11.5 C 13 9.5499381 14.549938 8 16.5 8 z"></path>
          </svg>
        </Link>
      </div>

      <div className="my-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() =>
              onCategoryChange(selectedCategory === category ? null : category)
            }
            className={`px-3 py-1 rounded-full mr-2 mb-2 ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
