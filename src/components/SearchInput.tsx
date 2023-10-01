import React, { useState } from "react";
import { useNavigate } from "react-router";

const SearchInput = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="text-gray-400 focus-within:text-gray-600"
      >
        <label htmlFor="search-field" className="sr-only">
          Search all files
        </label>
        <div className="flex flex-row justify-start items-center">
          <i className="bx bx-search text-white text-[23px]"></i>
          <input
            name="search-field"
            autoComplete="off"
            id="search-field"
            className="flex-1 bg-transparent border-none placeholder-gray-500 outline-none text-base text-white p-2"
            placeholder="Search"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
