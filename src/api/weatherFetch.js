export const asyncGetCurrentPosition = (options) =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });

const getCurrentWeatherFromAPI = (lat, lon) => {
  //first index is the current weather
  return `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly?lang=en&lon=${lon}&lat=${lat}`;
};

const getForecastFromAPI = (lat, lon) => {
  return `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lang=en&lon=${lon}&lat=${lat}`;
};

const methodsAndOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_WEATHER_APP_APIKEY,
  },
};

export const getCurrentWeather = async (latitude, longitude) => {
  const response = await fetch(
    getCurrentWeatherFromAPI(latitude, longitude),
    methodsAndOptions
  );

  return response.ok
    ? response.json()
    : Promise.reject({
        error: 500,
        message: "There was an error fetching the current weather",
      });
};

export const getForecastWeather = async (latitude, longitude) => {
  const response = await fetch(
    getForecastFromAPI(latitude, longitude),
    methodsAndOptions
  );

  return response.ok
    ? response.json()
    : Promise.reject({
        error: 500,
        message: "There was an error fetching the current weather",
      });
};
