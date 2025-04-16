import React from "react";
import { formatToLocalTime } from "../services/weatherServices";

const TimeAndLocation = ({ weather: { dt, timezone, name, country } }) => {
  return (
    <div className="text-center my-6">
      <p className="text-white text-xl font-light">
        {formatToLocalTime(dt, timezone)}
      </p>
      <p className="text-white text-3xl font-medium mt-2">
        {`${name}, ${country}`}
      </p>
    </div>
  );
};

export default TimeAndLocation;
