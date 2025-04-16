# 🌦️ WeatherApp

A responsive and modern weather forecasting application built with React, Express, and the WeatherAPI. It provides real-time weather updates, search functionality by city, and stores the recent search history with location and timestamps.

---

## 📌 Features

- 🌍 Current weather based on user geolocation
- 🔍 Search weather by city
- 📅 5-day forecast (daily & hourly)
- 📜 Search history saved in localStorage
- 🧭 Weather details including temperature, humidity, wind, pressure
- 🌈 Dynamic weather icons and UI changes
- ⚙️ Unit toggle (°C / °F)
- 🗑️ Clear search history
- ⚡ Fast and responsive design with Tailwind CSS
- 🛠️ Backend API integration using Express.js

---

## 🔗 APIs Used

- [WeatherAPI.com](https://www.weatherapi.com/)  
  → For real-time and forecast weather data based on city or coordinates

---

## 🛠️ Tech Stack

### Frontend:
- React.js (with React Router)
- Tailwind CSS
- Luxon (for date formatting)

### Backend:
- Node.js
- Express.js
- CORS
- `node-fetch`
- dotenv for environment management

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js installed
- WeatherAPI key (register at [weatherapi.com](https://www.weatherapi.com/))

---

## 🔧 Backend Setup

1. Navigate to the `server/` directory:

```bash
cd server

2. Create a .env file and add your API key:
        WEATHER_API_KEY=your_api_key_here

3. Install backend dependencies:
        npm install

4. Start the backend server:
        node server.js


 💻 Frontend Setup:

1. Navigate to the React frontend folder:
        cd client  

2. Create a .env file and add your API key:
        REACT_APP_WEATHER_API_KEY=your_api_key_here

3. Install frontend dependencies:
        npm install

4. Start the React development server:
        npm start



