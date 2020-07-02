import { observable, action } from "mobx";
import {
  getCurrentWeather,
  getForecastWeather,
  asyncGetCurrentPosition,
} from "../api/weatherFetch";

export default class WeatherModel {
  @observable currentWeather;
  @observable forecastWeather;
  @observable loading = true;
  @observable weatherError;

  @action load = async () => {
    if (navigator.geolocation) {
      let {
        coords: { latitude, longitude },
      } = await asyncGetCurrentPosition();

      getCurrentWeather(latitude, longitude)
        .then((currentWeatherData) => {
          getForecastWeather(latitude, longitude).then(
            (forecastWeatherData) => {
              this.currentWeather = currentWeatherData;
              this.forecastWeather = forecastWeatherData;

              this.loading = false;
            }
          );
        })
        .catch((error) => {
          this.weatherError = error;
          this.loading = false;
        });
    } else {
    }
  };
}
