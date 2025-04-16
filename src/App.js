import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import SearchHistory from "./pages/SearchHistory";
import getFormattedWeatherData from "./services/weatherServices"; 

function App() {
  const [query, setQuery] = useState({ q: "New York" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getFormattedWeatherData({ ...query, units });
      setWeather(data);

      // Save to localStorage
      const city = data.name;
      const time = new Date().toLocaleString();
      const newEntry = { city, time };

      const existing = JSON.parse(localStorage.getItem("searchHistory")) || [];
      const updated = [newEntry, ...existing.filter(item => item.city.toLowerCase() !== city.toLowerCase()).slice(0, 9)]; // limit to 10
      localStorage.setItem("searchHistory", JSON.stringify(updated));
       };

    fetchWeather();
  }, [query, units]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home weather={weather} setQuery={setQuery} units={units} setUnits={setUnits} />} />
        <Route path="/about" element={<About />} />
        <Route path="/search-history" element={<SearchHistory />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;