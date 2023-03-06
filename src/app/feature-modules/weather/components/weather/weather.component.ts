import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { WeatherService } from 'src/app/core/services/weather.service';
import { switchMap } from 'rxjs/operators';
import { Forecast } from './../../interfaces/weekly-forecast.interface';
import { AreaLocation } from '../../interfaces/weather-data.interface';
import { SnackbarErrorService } from 'src/app/core/services/snackbar-error.service';
import { DefaultLocation } from '../../interfaces/default-location.interface';
import { City } from '../../interfaces/city.interface';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  public autoCompleteInputField = new Subject<string>();
  private DEFAULT_LATITUDE: number = 31.774;
  private DEFAULT_LONGITUDE: number = 35.225;
  public temperature?: string;
  public weeklyForecast?: Forecast;
  public cityObject: City = {} as City;
  public isInFavorites: boolean = false;
  public errorMessage: string | null = null;

  constructor(private weatherService: WeatherService, private snackbarService: SnackbarErrorService) {}

  ngOnInit(): void {
    this.setDefaultLocation();
    // this.autoCompletedSearch();
  }

  
  private getWeather(locationKey: string) {
    this.weatherService.getLocationWeather(locationKey).subscribe({
      next: ((weather: any) => {
      this.temperature = `${weather[0].Temperature.Metric.Value}${weather[0].Temperature.Metric.Unit}`;}),
      error: ((error) => this.snackbarService.snackbarErrMessage(error))});
    }
  
  private autoCompletedSearch() {
    this.autoCompleteInputField.pipe(
      switchMap((data: string) => this.weatherService.getAutoCompleteLoaction(data)))
      .subscribe((suggestions: AreaLocation[]) => {
        this.cityObject = {
          key: suggestions[0].Key,
          city: suggestions[0].AdministrativeArea.LocalizedName,
          country: suggestions[0].Country.LocalizedName,
        };
        
        suggestions.forEach((suggestion: AreaLocation) => {
          return this.getWeather(suggestion.Key);
        })
        
        this.getWeeklyForecast(suggestions[0].Key);
      })
  }
  
  
  private getWeeklyForecast(locationKey: string): void {
      this.weatherService.getWeeklyForecastsWeather(locationKey).subscribe({
        next: ((location: Forecast) => this.weeklyForecast = location),
        error: ((error) => this.snackbarService.snackbarErrMessage(error))
      });
    }
    
  private setDefaultLocation() { //BONUS
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        
      this.weatherService.defaultLocation(latitude, longitude)
      .subscribe({
        next: ((location: DefaultLocation) => this.initializationLocation(location)), 
        error: (error) => this.snackbarService.snackbarErrMessage(error) })
      });
    }
    
    this.weatherService.defaultLocation(this.DEFAULT_LATITUDE, this.DEFAULT_LONGITUDE).subscribe({
      next: ((location: DefaultLocation) => this.initializationLocation(location)),
      error: ((error) => this.snackbarService.snackbarErrMessage(error))
    });
  }
  
  private initializationLocation(initLocation: any) {
    this.cityObject = {
      key: initLocation.Key,
      city: initLocation.AdministrativeArea.EnglishName,
      country: initLocation.Country.ID      
    };
    this.getWeather(initLocation.Key);
    this.getWeeklyForecast(initLocation.Key);

    let citiesInLocalStoarge = JSON.parse(localStorage.getItem('cities') || "[]");
    citiesInLocalStoarge.forEach((element: City) => {
      if (element.key === this.cityObject['key']) {
        this.isInFavorites = true;
        return;
      }

      this.isInFavorites = false;
    });
  }

  public addToFavorites() {
    let citiesInLocalStoarge = JSON.parse(localStorage.getItem('cities') || "[]");
    
    if (this.cityObject !== null) {
      citiesInLocalStoarge.push(this.cityObject)
      localStorage.setItem('cities', JSON.stringify(citiesInLocalStoarge))
      return;
    }
  }

  public removeFromFavorites(cityToRemove: any) {
    let citiesArray = [];
    let storageData =  JSON.parse(localStorage.getItem('cities') || "[]");

    citiesArray = storageData.filter((item: City) => item.key !== cityToRemove);
    localStorage.setItem('cities', citiesArray);

    this.isInFavorites = false;
  }
}
