import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { WeatherService } from 'src/app/core/services/weather.service';
import { debounceTime, switchMap, take } from 'rxjs/operators';
import { Forecast } from '@weather/interfaces/weekly-forecast.interface';
import { AreaLocation } from '@weather/interfaces/weather-data.interface';
import { SnackbarErrorService } from 'src/app/core/services/snackbar-error.service';
import { DefaultLocation } from '@weather/interfaces/default-location.interface';
import { City } from '@weather/interfaces/city.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  private DEFAULT_LATITUDE: number = environment.TEL_AVIV_LATITUDE;
  private DEFAULT_LONGITUDE: number = environment.TEL_AVIV_LONGITUDE;
  public autoCompleteInputField = new Subject<string>();
  public temperature?: string;
  public forecasts?: Forecast;
  public currentCity: City = {} as City;
  public isFavorites: boolean = false;

  constructor(private weatherService: WeatherService, private snackbarService: SnackbarErrorService) {}

  ngOnInit(): void {
    this.setDefaultLocation();
    this.autoCompletedSearch();
  }

  private getWeather(locationKey: string) {
    this.weatherService.getLocationWeather(locationKey).pipe(take(1))
    .subscribe({
      next: ((weather: any) => {
      this.temperature = `${weather[0].Temperature.Metric.Value}°${weather[0].Temperature.Metric.Unit}`;}),
      error: ((error) => this.snackbarService.snackbarErrMessage(error))});
    }
  
  private autoCompletedSearch() {
    this.autoCompleteInputField.pipe(
      debounceTime(1000),
      switchMap((data: string) => this.weatherService.getAutoCompleteLoaction(data)))
      .subscribe((suggestions: AreaLocation[]) => {
        this.currentCity = {
          key: suggestions[0].Key,
          city: suggestions[0].LocalizedName,
          country: suggestions[0].Country.LocalizedName,
        };
        suggestions.forEach((suggestion: AreaLocation) => {
          return this.getWeather(suggestion.Key);
        })

        this.getForecast(suggestions[0].Key);
        this.checkIfLocationSaved(this.currentCity['key']);
      })
    }
  
  private getForecast(locationKey: string): void {
      this.weatherService.getWeeklyForecastsWeather(locationKey).pipe(take(1))
      .subscribe({
        next: ((location: Forecast) => this.forecasts = location),
        error: ((error) => this.snackbarService.snackbarErrMessage(error))});
    }
    
  private setDefaultLocation() { //BONUS
      navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.weatherService.defaultLocation(latitude, longitude).pipe(take(1))
        .subscribe({
          next: ((location: DefaultLocation) => this.initializationLocation(location)), 
          error: (error) => this.snackbarService.snackbarErrMessage(error) })
      },
      () => {
        this.weatherService.defaultLocation(this.DEFAULT_LATITUDE, this.DEFAULT_LONGITUDE).pipe(take(1))
        .subscribe({
          next: ((location: DefaultLocation) => {
            this.initializationLocation(location)}),
          error: ((error) => this.snackbarService.snackbarErrMessage(error))});
      }
      );
    
  }
  
  private initializationLocation(initLocation: DefaultLocation) {
    this.currentCity = {
      key: initLocation.Key,
      city: initLocation.LocalizedName,
      country: initLocation.Country.ID
    };
    this.getWeather(initLocation.Key);
    this.getForecast(initLocation.Key);
    this.checkIfLocationSaved(this.currentCity['key']);
  }

  public addToFavorites() {
    const citiesInLocalStoarge: City[] = JSON.parse(localStorage.getItem('cities') || "[]");
    const isInStorage = citiesInLocalStoarge.find(city => city.key === this.currentCity.key);
    
    if (Object.keys(this.currentCity).length > 0) {
      if (!isInStorage) {
        citiesInLocalStoarge.push(this.currentCity)
        localStorage.setItem('cities', JSON.stringify(citiesInLocalStoarge))
      }
    }
    this.isFavorites = true;
  }

  public removeFromFavorites(cityToRemove: string) {
    let citiesArray = [];
    const storageData =  JSON.parse(localStorage.getItem('cities') || "[]");

    citiesArray = storageData.filter((item: City) => item.key !== cityToRemove);
    localStorage.setItem('cities', JSON.stringify(citiesArray));

    this.isFavorites = false;
  }

  //ONLY ENGLISH LETTERS VALIDATION
  public inputValidation(event: any) {
    const inputRegExp = /^[A-Za-z\s]*$/;
    let inputChar = String.fromCharCode(event.keyCode);
    
    if (inputRegExp.test(inputChar)) return true; 
    
    event.preventDefault();
    return false;  
  }

  private checkIfLocationSaved(key: any) {
    const citiesInLocalStoarge = JSON.parse(localStorage.getItem('cities') || "[]");
    const isFavorite = citiesInLocalStoarge.some((city: City) => city.key === key);
    if (isFavorite) 
      this.isFavorites = true;

    else 
      this.isFavorites = false;
  }
}
