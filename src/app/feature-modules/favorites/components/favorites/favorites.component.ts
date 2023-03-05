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
  public temperature: any[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getFavoriteCities();
  }

  getFavoriteCities(): void {
    let storageCities: any[] = [];
    this.favoritesArray = JSON.parse(localStorage.getItem('cities') || "[]");
    this.favoritesArray.forEach(city => {
      console.log('CITY', city)
      let cityIdentity = city.cityKey;
      this.weatherService.getLocationWeather(cityIdentity).subscribe(weather => {
        storageCities.push(...weather);
        this.temperature.push(...weather);
      })})

  }
}
