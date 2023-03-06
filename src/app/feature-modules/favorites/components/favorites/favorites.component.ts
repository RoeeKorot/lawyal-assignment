import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/core/services/weather.service';
import { City } from './../../../weather/interfaces/city.interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public favoritesArray: City[] = [];
  public temperature: any[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getFavoriteCities();
  }

  getFavoriteCities(): void {
    let storageCities: City[] = [];
    this.favoritesArray = JSON.parse(localStorage.getItem('cities') || "[]");

    this.favoritesArray.forEach(city => {
      let cityIdentity = city.key;
      this.weatherService.getLocationWeather(cityIdentity).subscribe(weather => {
        storageCities.push(...weather);
        this.temperature.push(...weather);
      })})

  }
}
