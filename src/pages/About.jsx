import { FaCloudSunRain, FaListUl } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";

const About = () => {
  return (
    <div className="min-h-screen px-6 py-10 text-white bg-gradient-to-b from-[#012a4a] to-[#013a63]">
      <h1 className="text-4xl font-bold mb-10 text-center">About Weather App</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-[#01497c] p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4 text-xl font-bold">
            <FaCloudSunRain className="text-3xl mr-2 text-blue-300" />
            Weather App
          </div>
          <p className="text-gray-300">
            A full-stack weather application built with modern web technologies. It provides real-time weather for your location or searched cities, including temperature, humidity, wind speed, and forecast. Responsive design with a clean UI ensures seamless experience across devices.
          </p>
        </div>

        <div className="bg-[#01497c] p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4 text-xl font-bold">
            <FaListUl className="text-2xl mr-2 text-blue-300" />
            Features
          </div>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li><MdLocationPin className="inline mr-2" />Current location weather detection</li>
            <li><BsSunFill className="inline mr-2" />City search functionality</li>
            <li><FaCloudSunRain className="inline mr-2" />Detailed weather info</li>
            <li><FaCloudSunRain className="inline mr-2" />5-day forecast</li>
            <li><FaListUl className="inline mr-2" />Search history tracking</li>
            <li><FaCloudSunRain className="inline mr-2" />Responsive UI</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">How Weather Data is Fetched</h2>
      <div className="bg-[#01497c] p-6 rounded-lg text-gray-300">
        <ol className="list-decimal list-inside space-y-2">
          <li><strong>Current Location Weather:</strong> Uses your coordinates to fetch weather if permission is granted.</li>
          <li><strong>City Search:</strong> Requests weather data from OpenWeatherMap API based on city name.</li>
          <li><strong>Data Processing:</strong> Server processes and formats weather API response.</li>
          <li><strong>Forecast Data:</strong> Additional API call made to show daily/hourly forecasts.</li>
          <li><strong>Search History:</strong> Each city search is saved to server or localStorage for quick access later.</li>
        </ol>
      </div>
    </div>
  );
};

export default About;
