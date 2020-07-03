import { observable, action } from "mobx";
import {
  getCurrentWeather,
  getForecastWeather,
  asyncGetCurrentPosition,
} from "../api/weatherFetch";
import { timeBlocks, getCurrentDateTime } from "../utils/dateUtils";

export default class WeatherModel {
  @observable currentWeather;
  @observable weatherThreeHourlyToday;
  @observable forecastWeather;
  @observable loading = true;
  @observable weatherError;

  formatForThreeHourlyToday = (currentWeatherData) => {
    const today = getCurrentDateTime()[0];
    return currentWeatherData.data.filter((dataPoint) => {
      let dateTime = dataPoint.timestamp_local.split("T");

      if (timeBlocks[dateTime[1]] && dateTime[0] === today) {
        return dataPoint;
      }
    });
  };

  @action load = async () => {
    if (navigator.geolocation) {
      let {
        coords: { latitude, longitude },
      } = await asyncGetCurrentPosition();

      getCurrentWeather(latitude, longitude)
        .then((currentWeatherData) => {
          getForecastWeather(latitude, longitude).then(
            (forecastWeatherData) => {
              this.weatherThreeHourlyToday = this.formatForThreeHourlyToday(
                currentWeatherData
              );
              this.currentWeather = currentWeatherData.data[0];
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
