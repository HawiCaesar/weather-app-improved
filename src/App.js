import React, { useState } from "react";
import "./styles.css";
import "./tailwind.generated.css";
import { usePosition } from "./usePosition";

const getURL = ({ lat, lon }) => {
  return `https://weatherbit-v1-mashape.p.rapidapi.com/current?lang=en&lon=${lon}&lat=${lat}`;
};

export default function App() {
  const { latitude, longitude, error } = usePosition();
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
      setWeatherData(data);
    });
  }

  if (weatherData) {
    let currentWeather = weatherData.data[0].weather;
    return (
      <div className="App">
        <h1 className="text-5xl text-black-700 leading-tight">Weather App</h1>
        <h2 className="text-2xl text-black-700 leading-tight">
          {currentWeather.description}
        </h2>
        <img
          src={`https://www.weatherbit.io/static/img/icons/${currentWeather.icon}.png`}
          height="60"
          width="60"
          alt={currentWeather.description}
          className="leading-tight"
        />

        <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
          <div className="ml-6 pt-1">
            <h1 className="text-2xl text-blue-700 leading-tight">
              Tailwind and Create React App
            </h1>
            <p className="text-base text-gray-700 leading-normal">
              Building apps together
            </p>
          </div>
        </div>
      </div>
    );
  }

  return "Loading...";
}
