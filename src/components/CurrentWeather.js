import React from "react";
import "../styles.css";
import "../tailwind.generated.css";
import { observer } from "mobx-react";
import Spin from "../spin.svg";

@observer
class CurrentWeather extends React.Component {
  render() {
    const { store } = this.props;

    if (store.loading) {
      return <img src={Spin} alt="loading" className="my-0 mx-auto" />;
    }

    const currentWeather = store.currentWeather.data[0];

    console.log(store.forecastWeather, '========')

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
}

export { CurrentWeather };
