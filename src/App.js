import React, { useState } from "react";
import "./styles.css";
import { usePosition } from "./usePosition";
require("dotenv").config();

const getURL = ({ lat, lon }) => {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_APP_APIKEY}`;
};

export default function App() {
  const { latitude, longitude, error } = usePosition();
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  const getWeather = async (lat, lon) => {
    const response = await fetch(getURL({ lat, lon }));
    return response.ok ? response.json() : Promise.reject({ error: 500 });
  };

  const abc = async (lat, lon) => {
    const response = await getWeather(lat, lon);
    setLoading(false);
    //setWeatherData(response);
  };

  if (error) {
    console.log(error, "#####");
  } else if (latitude && longitude) {
    console.log(abc(latitude, longitude));
  }

  return (
    <div className="App">
      <h1>Weather App</h1>
      {loading ? "Loading..." : "Have weather data"}
    </div>
  );
}
