import React, { useState } from "react";
import "./styles.css";
import "./tailwind.generated.css";
import { usePosition } from "./usePosition";
//import { getCurrentDateTime } from './utils/dateUtils'
import { currentWeatherModel, forecastWeatherModel } from "./models/weather";

const getForecast = (lat, lon) => {
  return `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lang=en&lon=${lon}&lat=${lat}`;
};

const getCurrentWeather = (lat, lon) => {
  return `https://weatherbit-v1-mashape.p.rapidapi.com/current?lang=en&lon=${lon}&lat=${lat}`;
};

export default function App() {
  //const { latitude, longitude, error } = usePosition();
  const [weatherData, setWeatherData] = useState(null);

  const getCurrentLocation = (map) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Get the coordinates of the current position.
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log(lat, lng);
        },
        (error) => {
          console.log(error, "ERROR");
        }
      );
    } else {
      console.log("DOESN't support Geolocation");
    }
  };

  const asyncGetCurrentPosition = options => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });

  const getCoordinates = async () => {
    if (navigator.geolocation) {
      let {coords: {latitude, longitude}} = await asyncGetCurrentPosition();
      console.log(latitude, longitude, '--------')
      return {latitude, longitude}

    } else {
      return "ERROR"
    }
  }

  getCoordinates()

  // const getWeather = async (url) => {
  //   const response = await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
  //       "x-rapidapi-key": process.env.REACT_APP_WEATHER_APP_APIKEY,
  //     },
  //   });
  //   return response.ok ? response.json() : Promise.reject({ error: 500 });
  // };

  // if (error) {
  //   return "Error in getting coordinates";
  // }

  // if (latitude && longitude && weatherData === null) {
  //   getWeather(getCurrentWeather(latitude, longitude)).then(
  //     (currentWeather) => {
  //       getWeather(getForecast(latitude, longitude)).then((forecastWeather) => {
  //         setWeatherData({
  //           currentWeather: currentWeatherModel(currentWeather),
  //           forecastWeather: forecastWeatherModel(forecastWeather),
  //         });
  //       });
  //     }
  //   );
  // }

  // if (weatherData) {
  //   let currentWeather = weatherData.currentWeather[0];

  //   console.log(latitude, longitude)

  //   return (
  //     <div className="App">
  //       <h1 className="text-5xl text-black-700 leading-tight">Weather App</h1>
  //       <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl content-center">
  //         <div className="mx-auto pt-1 content-center">
  //           <img
  //             src={`https://www.weatherbit.io/static/img/icons/${currentWeather.weather.icon}.png`}
  //             height="60"
  //             width="60"
  //             alt={currentWeather.description}
  //             className="my-0 mx-auto"
  //           />
  //           <h2 className="w-64 text-2xl text-black-700 leading-tight">
  //             {currentWeather.temp} &#8451;
  //           </h2>
  //           <div className="my-3">{currentWeather.weather.description}</div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return "Loading...";
}
