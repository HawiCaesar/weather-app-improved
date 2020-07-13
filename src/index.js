import React from "react";
import { render } from "react-dom";

import { Weather } from "./components/Weather";
import WeatherModel from "./models/WeatherModel";

const store = new WeatherModel();

store.load()

const rootElement = document.getElementById("root");
render(
  <div>
    <Weather store={store} />
  </div>,
  rootElement
);
