import React from "react";

export const FiveDayForecast = ({ forecastWeather }) => {
  return (
    <React.Fragment>
      <h3 className="text-2xl text-black-700 leading-tight">5 day forecast</h3>
      <div className="flex flex-wrap flex-row bg-gray-200 ml-24 mr-32 my-8">
        {forecastWeather.map((weatherPoint, index) => (
          <div
            className="text-gray-700 text-center bg-gray-100 px-4 py-2 m-2"
            key={index}
          >
            <img
              src={`https://www.weatherbit.io/static/img/icons/${weatherPoint.weather.icon}.png`}
              height="60"
              width="60"
              alt={weatherPoint.description}
              className="my-0 mx-auto"
            />
            <h2 className="w-64 my-4 text-lg text-black-700 leading-tight">
              {weatherPoint.dayOfTheWeek}
            </h2>
            <h2 className="w-64 text-base text-black-700 leading-tight">
              High: {weatherPoint.max_temp} &#8451;
            </h2>
            <h2 className="w-64 text-base text-black-700 leading-tight">
              Low: {weatherPoint.min_temp} &#8451;
            </h2>
            <div className="my-3">{weatherPoint.weather.description}</div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};
