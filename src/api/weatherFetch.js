const asyncGetCurrentPosition = (options) =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });

const getCurrentWeatherFromAPI = (lat, lon) => {
  return `https://weatherbit-v1-mashape.p.rapidapi.com/current?lang=en&lon=${lon}&lat=${lat}`;
};

export const getCurrentWeatherFromCoordinates = async () => {
  if (navigator.geolocation) {
    let {
      coords: { latitude, longitude },
    } = await asyncGetCurrentPosition();

    const response = await fetch(getCurrentWeatherFromAPI(latitude, longitude), {
      method: "GET",
      headers: {
        "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_WEATHER_APP_APIKEY,
      },
    });
    return response.ok ? response.json() : Promise.reject({ error: 500 });
  } else {
    return "ERROR";
  }
};
