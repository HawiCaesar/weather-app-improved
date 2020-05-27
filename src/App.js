import React, { useState } from "react";
import "./styles.css";
import "./tailwind.generated.css";
import { usePosition } from "./usePosition";
//import { getCurrentDateTime } from './utils/dateUtils'

const getForecast = (lat, lon) => {
  return `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly?lang=en&lon=${lon}&lat=${lat}`;
};

const getCurrentWeather = (lat, lon) => {
  console.log(lat, lon, "####");
  return `https://weatherbit-v1-mashape.p.rapidapi.com/current?lang=en&lon=${lon}&lat=${lat}`;
};

export default function App() {
  const { latitude, longitude, error } = usePosition();
  const [weatherData, setWeatherData] = useState(null);
  const getWeather = async (url) => {
    const response = await fetch(url, {
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
    getWeather(getCurrentWeather(latitude, longitude)).then(
      (currentWeather) => {
        getWeather(getForecast(latitude, longitude)).then((forecastWeather) => {
          setWeatherData(currentWeather);
        });
      }
    );
  }

  if (weatherData) {
    let currentWeather = weatherData.data[0];
    //console.log(getCurrentDateTime())
    return (
      <div className="App">
        <h1 className="text-5xl text-black-700 leading-tight">Weather App</h1>
        <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl content-center">
          <div className="mx-auto pt-1 content-center">
            <img
              src={`https://www.weatherbit.io/static/img/icons/${currentWeather.weather.icon}.png`}
              height="60"
              width="60"
              alt={currentWeather.description}
              className="my-0 mx-auto"
            />
            <h2 className="w-64 text-2xl text-black-700 leading-tight">
              {currentWeather.temp} &#8451;
            </h2>
            <div className="my-3">{currentWeather.weather.description}</div>
          </div>
        </div>
      </div>
    );
  }

  return "Loading...";
}
