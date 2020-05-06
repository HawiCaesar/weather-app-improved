import React, { useState } from "react";
import "./styles.css";
import { usePosition } from "./usePosition";

const getURL = ({ lat, lon }) => {
  return `https://weatherbit-v1-mashape.p.rapidapi.com/current?lang=en&lon=${lon}&lat=${lat}`;
};

export default function App() {
  const { latitude, longitude, error } = usePosition();
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const getWeather = async (lat, lon) => {
    const response = await fetch(getURL({ lat, lon }), {
      method: "GET",
      headers: {
        "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_WEATHER_APP_APIKEY,
      },
    });
    return response.ok ? response.json() : Promise.reject({ error: 500 });
  };

  if (error) {
    return "Error in getting coordinates";
  }

  if (latitude && longitude && weatherData === null) {
    getWeather(latitude, longitude).then((data) => {
      console.log("HERE WE ARE", data);
      setLoading(false);
      setWeatherData(data);
    });
  }

  if (weatherData && !loading) {
    return (
      <div className="App">
        <h1>Weather App</h1>
      </div>
    );
  }

  return "Loading...";
}
