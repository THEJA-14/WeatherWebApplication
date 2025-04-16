import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-gradient-to-r from-[#01497c] to-[#2a6f97] shadow-md py-4">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
      <div className="text-white text-3xl mb-2 sm:mb-0 cursor-pointer" onClick={() => navigate("/")}>
  WeatherApp
</div>



        <div className="flex space-x-6 text-white text-md font-medium">
          <button onClick={() => navigate("/")} className="hover:text-gray-200 transition">
            Home
          </button>
          <button onClick={() => navigate("/search-history")} className="hover:text-gray-200 transition">
            Search History
          </button>
          <button onClick={() => navigate("/about")} className="hover:text-gray-200 transition">
            About
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
