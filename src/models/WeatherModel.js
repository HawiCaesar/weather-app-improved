import { observable } from "mobx";
import { getCurrentWeatherFromCoordinates } from "../api/weatherFetch";

export default class WeatherModel {
  @observable currentWeather;
  @observable loading = true
  constructor() {
    this.loading = true
    getCurrentWeatherFromCoordinates().then((data) => {
      this.currentWeather = data;

      this.loading = false
    });
  }
}
