import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/core/services/weather.service';
import { WeatherData } from './../../interfaces/weather-data.interface';
import { Forecast } from './../../interfaces/weekly-forecast.interface';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  private defaultCityKey: string = '215854';
  public temperature?: any;
  public weatherData?: WeatherData;
  public weeklyForecast?: Forecast;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getDefaultCity(this.defaultCityKey);
  }

  private getDefaultCity(locationKey: string): void {
    this.weatherService.getDefaultLocation(locationKey).subscribe(location => {
      this.weatherData = location;
      this.getWeather(this.weatherData.Key);
      this.getWeeklyForecast(this.weatherData.Key);
    })
  }

  private getWeather(locationKey: string) {
    this.weatherService.getLocationWeather(locationKey).subscribe(weather => {
      this.temperature = weather;
      console.log(this.temperature)
    })
  }

  public getLocationByCityName(city: string): void {
      this.weatherService.getCityByName(city).subscribe((cities) => {
        this.weatherData = cities[0];
        this.getWeather(this.weatherData.Key);
        this.getWeeklyForecast(this.weatherData.Key);
      })
  }

  private getWeeklyForecast(locationKey: string): void {
      this.weatherService.getWeeklyForecastsWeather(locationKey).subscribe(location => {
        this.weeklyForecast = location;
    })
  }
}
