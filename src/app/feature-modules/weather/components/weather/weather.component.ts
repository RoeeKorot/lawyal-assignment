import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { WeatherService } from 'src/app/core/services/weather.service';
import { switchMap } from 'rxjs/operators';
import { Forecast } from './../../interfaces/weekly-forecast.interface';
import { AreaLocation } from '../../interfaces/weather-data.interface';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  public autoCompleteInputField = new Subject<string>();
  private DEFAULT_LATITUDE = 31.774;
  private DEFAULT_LONGITUDE = 35.225;
  public temperature?: any;
  public weeklyForecast?: Forecast;
  public cityObject: any = {};

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.setDefaultLocation();
    // this.autoCompletedSearch();
  }

  private getWeather(locationKey: string) {
    this.weatherService.getLocationWeather(locationKey).subscribe((weather: any) => {
      this.temperature = weather[0].Temperature.Metric;
    })
  }

  private autoCompletedSearch() {
    this.autoCompleteInputField.pipe(
      switchMap((data: string) => this.weatherService.getAutoCompleteLoaction(data)))
      .subscribe((suggestions: AreaLocation[]) => {
      this.cityObject = {
        cityName: suggestions[0].AdministrativeArea.LocalizedName,
        countryName: suggestions[0].Country.LocalizedName
      };

      suggestions.forEach((suggestion: AreaLocation) => {
        return this.getWeather(suggestion.Key);
      })

      this.getWeeklyForecast(suggestions[0].Key);
    })
  }


  private getWeeklyForecast(locationKey: string): void {
      this.weatherService.getWeeklyForecastsWeather(locationKey).subscribe(location => {
        this.weeklyForecast = location;
    })
  }

  private setDefaultLocation() { //BONUS
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      
      this.weatherService.defaultLocation(latitude, longitude)
        .subscribe(location => this.initializationLocation(location))});
    }

      this.weatherService.defaultLocation(this.DEFAULT_LATITUDE, this.DEFAULT_LONGITUDE)
      .subscribe(location => this.initializationLocation(location));
  }

  private initializationLocation(initLocation: any) {
    this.cityObject = {
      cityName: initLocation.AdministrativeArea.EnglishName,
      countryName: initLocation.Country.ID
    };
    this.getWeather(initLocation.Key);
    this.getWeeklyForecast(initLocation.Key);
  }
}
