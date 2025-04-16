import React from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { FaTemperatureLow } from "react-icons/fa";
import { WiCloudyWindy, WiHumidity } from "react-icons/wi";
import { BsSun } from "react-icons/bs";
import { FiSunset } from "react-icons/fi";
import { iconUrlFromCode, formatToLocalTime } from "../services/weatherServices";

const TemperatureDetails = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-white py-6">
      <div className="text-xl text-cyan-300 mb-6 text-center">
        <p>{details}</p>
      </div>

    
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
        <img
          src={iconUrlFromCode(icon)}
          alt="Weather Icon"
          className="w-20 h-20"
        />
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2 text-sm font-light text-center">
          <div className="flex items-center justify-center">
            <FaTemperatureLow size={18} className="mr-2" />
            Real Feel:
            <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className="flex items-center justify-center">
            <WiHumidity size={24} className="mr-2" />
            Humidity:
            <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="flex items-center justify-center">
            <WiCloudyWindy size={20} className="mr-2" />
            Wind:
            <span className="font-medium ml-1">{`${speed}Km/hr`}</span>
          </div>
        </div>
      </div>

      
      <div className="flex flex-wrap justify-center items-center text-sm space-x-2">
        <BsSun />
        <p>
          Rise:
          <span className="font-medium ml-1">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>
        <FiSunset />
        <p>
          Set:
          <span className="font-medium ml-1">
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>
        <AiOutlineArrowUp />
        <p>
          High:
          <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>
        <AiOutlineArrowDown />
        <p>
          Low:
          <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
};

export default TemperatureDetails;
