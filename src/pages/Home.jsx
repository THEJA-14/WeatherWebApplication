import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Inputs from "../components/Inputs";
import TimeAndLocation from "../components/TimeAndLocation";
import TemperatureDetails from "../components/TemperatureDetails";
import Forecast from "../components/Forecast";
import getFormattedWeatherData from "../services/weatherServices";

const Home = () => {
  const location = useLocation();

  const [query, setQuery] = useState(null); 
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (location.state?.city) {
      setQuery({ q: location.state.city });
    } else {
      
      setQuery({ q: "tokyo" });
    }
  }, [location]);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!query) return;

      const data = await getFormattedWeatherData({ ...query, units });

      if (data?.name && data?.country) {
        setWeather(data);
        saveSearchToHistory(data.name, data.country);
      }
    };

    fetchWeather();
  }, [query, units]);

  const saveSearchToHistory = (city, country) => {
    const timestamp = new Date().toLocaleString();
    const fullCity = `${city}, ${country}`;
    const newEntry = { city: fullCity, time: timestamp };

    let existing = JSON.parse(localStorage.getItem("searchHistory")) || [];

    const alreadyExists = existing.find(
      (entry) => entry.city.toLowerCase() === fullCity.toLowerCase()
    );

    if (!alreadyExists) {
      existing.unshift(newEntry);
      if (existing.length > 10) existing = existing.slice(0, 10);
      localStorage.setItem("searchHistory", JSON.stringify(existing));
    }
  };

  return (
    <div className="px-4 py-6">
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TemperatureDetails weather={weather} />
          <Forecast title="Hourly Forecast" items={weather.hourly} />
          <Forecast title="Daily Forecast" items={weather.daily} />
        </>
      )}
    </div>
  );
};

export default Home;
