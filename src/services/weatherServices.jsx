import { DateTime } from "luxon";

const API_KEY = "d1ada702efe5e6d4916d130ede8f5933";
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
    timezone,
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
    timezone,
  };
};

const formatFiveDayForecast = (data) => {
  const timezone = data.city.timezone;
  const daily = [];
  const hourly = [];

  data.list.forEach((item) => {
    const dt = item.dt;
    const date = DateTime.fromSeconds(dt).toUTC().plus({ seconds: timezone });
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

  return { timezone, daily, hourly, list: data.list }; // list included for high/low correction
};

const getFormattedWeatherData = async (searchParams) => {
  const currentWeather = await getWeatherData("weather", searchParams).then(
    formatCurrentWeather
  );

  const forecastWeather = await getWeatherData("forecast", {
    q: currentWeather.name,
    units: searchParams.units,
  }).then(formatFiveDayForecast);


const today = DateTime.fromSeconds(currentWeather.dt)
.toUTC()
.plus({ seconds: currentWeather.timezone })
.toFormat("yyyy-MM-dd");

const todayTemps = forecastWeather.list
.filter((item) => {
  const itemDate = DateTime.fromSeconds(item.dt)
    .toUTC()
    .plus({ seconds: currentWeather.timezone })
    .toFormat("yyyy-MM-dd");
  return itemDate === today;
})
.map((item) => item.main.temp);

// Guard against empty arrays to avoid Math.max(...[]) = -Infinity
const derivedHigh =
todayTemps.length > 0 ? Math.max(...todayTemps) : currentWeather.temp_max;
const derivedLow =
todayTemps.length > 0 ? Math.min(...todayTemps) : currentWeather.temp_min;

return {
...currentWeather,
...forecastWeather,
temp_max: derivedHigh,
temp_min: derivedLow,
};

};

const formatToLocalTime = (
  secs,
  timezoneOffset,
  format = "cccc, dd LLL yyyy | hh:mm a"
) => {
  return DateTime.fromSeconds(secs)
    .toUTC()
    .plus({ seconds: timezoneOffset })
    .toFormat(format);
};

const iconUrlFromCode = (code) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export { formatToLocalTime, iconUrlFromCode };
