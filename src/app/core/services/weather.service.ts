import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AreaLocation } from './../../feature-modules/weather/interfaces/weather-data.interface';
import { Forecast } from './../../feature-modules/weather/interfaces/weekly-forecast.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiKey: string = environment.API_KEY;
  private readonly baseUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  public defaultLocation(lat: any, lon: any): Observable<any> {
    const url = `${this.baseUrl}/locations/v1/cities/geoposition/search`;
    return this.http.get(url, {params: {apikey: this.apiKey, q: `${lat},${lon}`}});
  }
  
  public getLocationWeather(locationKey: string): Observable<any> {
    const url = `${this.baseUrl}/currentconditions/v1/${locationKey}`;
    return this.http.get(url, { params: { apikey: this.apiKey }});
  }

  public getAutoCompleteLoaction(city: string): Observable<AreaLocation[]> {
    const url = `${this.baseUrl}/locations/v1/cities/autocomplete`; 
    return this.http.get<AreaLocation[]>(url,{ params: { apikey: this.apiKey, q: city }});
  }

  public getWeeklyForecastsWeather(locationKey: string): Observable<Forecast> {
    const url = `${this.baseUrl}/forecasts/v1/daily/5day/${locationKey}`;
    return this.http.get<Forecast>(url, { params: { apikey: this.apiKey, metric: true }});
  }
}
