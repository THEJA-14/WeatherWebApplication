import { DateTime } from "luxon";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";


const getWeatherData = (infoType, searchParams) => {
  const url = new URL(`${BASE_URL}/${infoType}`);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};


const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    details,
    icon,
    country,
    sunrise,
    sunset,
    speed,
  };
};


const formatFiveDayForecast = (data) => {
  const timezone = data.city.timezone;
  const daily = [];
  const hourly = [];

  data.list.forEach((item) => {
    const dt = item.dt;
    const date = DateTime.fromSeconds(dt);
    const time = date.toFormat("ccc");
    const hour = date.toFormat("hh:mm a");

  
    if (item.dt_txt.includes("12:00:00")) {
      daily.push({
        title: time,
        temp: item.main.temp,
        icon: item.weather[0].icon,
      });
    }

    
    if (hourly.length < 5) {
      hourly.push({
        title: hour,
        temp: item.main.temp,
        icon: item.weather[0].icon,
      });
    }
  });

  return { timezone, daily, hourly };
};


const getFormattedWeatherData = async (searchParams) => {
  const currentWeather = await getWeatherData("weather", searchParams).then(
    formatCurrentWeather
  );

  const forecastWeather = await getWeatherData("forecast", {
    q: currentWeather.name,
    units: searchParams.units,
  }).then(formatFiveDayForecast);

  return { ...currentWeather, ...forecastWeather };
};


const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export { formatToLocalTime, iconUrlFromCode };
