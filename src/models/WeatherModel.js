import { observable, action } from "mobx";
import {
  getCurrentWeather,
  getForecastWeather,
  getThreeHourlyForecast,
  asyncGetCurrentPosition,
} from "../api/weatherFetch";
import { timeBlocks, getCurrentDateTime, days } from "../utils/dateUtils";

export default class WeatherModel {
  @observable currentWeather;
  @observable weatherThreeHourlyToday;
  @observable forecastWeather;
  @observable loading = true;
  @observable weatherError;

  formatForThreeHourlyToday = (weatherData) => {
    const today = getCurrentDateTime()[0];
    return weatherData.data.filter((dataPoint) => {
      let dateTime = dataPoint.timestamp_local.split("T");

      return timeBlocks[dateTime[1]] && dateTime[0] === today;
    }).map((dataPoint) => {
      dataPoint.weatherAt = dataPoint.timestamp_local.split("T")[1]
      return dataPoint
    });
  };

  formatForFiveDays = (weatherData) => {
    weatherData.data.shift();
    return weatherData.data.map((dataPoint) => {
      let date = new Date(dataPoint.datetime);
      dataPoint.dayOfTheWeek = days[date.getDay()];
      return dataPoint;
    });
  };

  @action load = async () => {
    if (navigator.geolocation) {
      let {
        coords: { latitude, longitude },
      } = await asyncGetCurrentPosition();

      getCurrentWeather(latitude, longitude)
        .then((currentWeatherData) => {
          getThreeHourlyForecast(latitude, longitude).then(
            (threeHourForecast) => {
              getForecastWeather(latitude, longitude).then(
                (forecastWeatherData) => {
                  this.currentWeather = currentWeatherData.data[0];
                  this.weatherThreeHourlyToday = this.formatForThreeHourlyToday(
                    threeHourForecast
                  );

                  this.forecastWeather = this.formatForFiveDays(
                    forecastWeatherData
                  );

                  this.loading = false;
                }
              );
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
