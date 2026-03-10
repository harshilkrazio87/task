import React from "react";
import { FiSearch } from "react-icons/fi";

const Header = ({ setSearch }) => {
  return (
    <header className="bg-white ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200">
        {/* Logo */}
        <h1 className="text-xl font-semibold text-gray-800">Task Management</h1>
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full  rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
