import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { WeatherData } from './../../feature-modules/weather/interfaces/weather-data.interface';
import { Forecast } from './../../feature-modules/weather/interfaces/weekly-forecast.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiKey: string = environment.API_KEY;
  private readonly baseUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  public getDefaultLocation(locationkey: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      `${this.baseUrl}/locations/v1/${locationkey}`,
      { params: { apikey: this.apiKey } }
    );
  }

  public getLocationWeather(locationKey: string) {
    return this.http.get(
      `${this.baseUrl}/currentconditions/v1/${locationKey}`,
      { params: { apikey: this.apiKey } }
    );
  }

  public getCityByName(city: string): Observable<WeatherData[]> {
    return this.http.get<WeatherData[]>(
      `${this.baseUrl}/locations/v1/cities/search`,
      { params: { apikey: this.apiKey, q: city } }
    );
  }

  public getWeeklyForecastsWeather(locationKey: string): Observable<Forecast> {
    return this.http.get<Forecast>(
      `${this.baseUrl}/forecasts/v1/daily/5day/${locationKey}`,
      { params: { apikey: this.apiKey, metric: true } }
    );
  }
}
