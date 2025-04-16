import React, { useEffect, useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { FaRegClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const SearchHistory = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(stored);
  }, []);


  const handleCityClick = (city) => {
    navigate("/", { state: { city } });
  };

  return (
    <div className="px-6 py-8 text-white min-h-screen bg-gradient-to-b from-[#01497c] to-[#2a6f97]">
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-center w-full">Search History</h1>
      </div>

      {history.length === 0 ? (
        <p className="text-gray-300">No search history available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {history.map((entry, index) => (
            <div
              key={index}
              onClick={() => handleCityClick(entry.city)}
              className="cursor-pointer bg-[#012a4a] rounded-lg p-5 shadow-md hover:bg-[#01497c] transition-all">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <HiLocationMarker className="text-yellow-300" />
                <span className="capitalize">{entry.city}</span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-200">
                <FaRegClock />
                <span>{entry.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchHistory;
