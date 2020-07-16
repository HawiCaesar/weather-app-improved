import React from "react";

export const ThreeHourForecast = ({ weatherThreeHourlyToday }) => {
  return (
    <React.Fragment>
      {weatherThreeHourlyToday.length ? (
        <React.Fragment>
          <h3 className="text-2xl text-black-700 leading-tight">
            3 Hour forecast today
          </h3>
          <div className="flex flex-wrap flex-row bg-gray-200 xsm:mx-8 sm:ml-12 sm:mr-16 ml-24 mr-32 my-8 sm:pl-4">
            {weatherThreeHourlyToday.map((weatherPoint, index) => (
              <div
                className="text-gray-700 text-center bg-gray-100 px-4 py-2 m-3"
                key={index}
              >
                <div className="my-3">At {weatherPoint.weatherAt}</div>
                <img
                  src={`https://www.weatherbit.io/static/img/icons/${weatherPoint.weather.icon}.png`}
                  height="60"
                  width="60"
                  alt={weatherPoint.description}
                  className="my-0 mx-auto"
                />
                <h2 className="w-64 text-2xl text-black-700 leading-tight">
                  {weatherPoint.temp} &#8451;
                </h2>
                <div className="my-3">{weatherPoint.weather.description}</div>
              </div>
            ))}
          </div>
        </React.Fragment>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};
