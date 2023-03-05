import { Component, OnInit } from '@angular/core';
import { Favorites } from './../../interfaces/favorites.interface';
import { WeatherService } from 'src/app/core/services/weather.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public favoritesArray: Favorites[] = [];
  public temperature: string | null = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getFavoriteCities();
  }

  getFavoriteCities(): void {
    this.favoritesArray = JSON.parse(localStorage.getItem('cities') || "[]");
    this.favoritesArray.forEach(city => {
      let cityIdentity = city.cityKey;
      this.weatherService.getLocationWeather(cityIdentity).subscribe(weather => {
        console.log('CITY', weather)
        this.temperature = `${weather[0].Temperature.Metric.Value}${weather[0].Temperature.Metric.Unit}`;
      })})
  }
}
