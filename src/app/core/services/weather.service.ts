import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { WeatherData } from './../../feature-modules/weather/interfaces/weather-data.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey: string = environment.API_KEY;
  private baseUrl: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  getCityByName(city: string): Observable<WeatherData> {
    const params = new HttpParams()
    .set('apikey', this.apiKey)
    .set('q', city)

    return this.http.get<WeatherData>(this.baseUrl, {params: params});
  }
}
