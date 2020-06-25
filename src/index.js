import React from "react";
import { render } from "react-dom";

import { CurrentWeather } from './components/CurrentWeather'
import WeatherModel from './models/WeatherModel'

const store = new WeatherModel();

const rootElement = document.getElementById("root");
render(
  <div>
    <CurrentWeather store={store} />
  </div>,
  rootElement
);
