import React, { useState } from "react";
import { Search, User, Menu, X } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Header = ({ setSearch }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left Section */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>

              <span className="font-semibold text-slate-800 text-lg hidden sm:block">
                TaskManagement
              </span>
            </div>
          </div>

          {/* Search (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 py-2 w-full outline-none border rounded-full bg-slate-50 border-slate-200 focus:bg-white"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">

            {/* Mobile Search Button */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
            >
              <Search className="w-5 h-5 text-slate-600" />
            </button>

            {/* User */}
            <div className="relative">
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center cursor-pointer hover:bg-indigo-200"
              >
                <User className="w-5 h-5 text-indigo-600" />
              </div>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Search Input */}
        {showSearch && (
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 py-2 w-full outline-none border rounded-full bg-slate-50 border-slate-200"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;