import React from "react";
import "../styles.css";
import "../tailwind.generated.css";
import { observer } from "mobx-react";
import Spin from "../spin.svg";
import { ThreeHourForecast } from "./ThreeHourForecast";
import { FiveDayForecast } from "./FiveDayForecast";

@observer
class Weather extends React.Component {
  render() {
    const { store } = this.props;

    if (store.loading) {
      return <img src={Spin} alt="loading" className="my-0 mx-auto" />;
    }

    const { weatherError } = store;

    if (weatherError) {
      return (
        <div role="alert">
          <div className="mt-48 bg-red-500 text-white font-bold rounded-t px-4 py-2">
            Something went wrong
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>{weatherError.message}</p>
          </div>
        </div>
      );
    }

    const { currentWeather, weatherThreeHourlyToday, forecastWeather } = store;

    return (
      <div className="App">
        <h1 className="text-5xl text-black-700 leading-tight">Weather App</h1>
        <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg content-center">
          <div className="mx-auto pt-1 content-center">
            <div className="my-3">Now</div>
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

        <br />
        <ThreeHourForecast weatherThreeHourlyToday={weatherThreeHourlyToday} />
        <FiveDayForecast forecastWeather={forecastWeather} />
      </div>
    );
  }
}

export { Weather };
