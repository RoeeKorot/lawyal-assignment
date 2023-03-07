import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/core/services/weather.service';
import { City } from '@weather/interfaces/city.interface';
import { Router, Routes } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public favoritesArray: City[] = [];
  public temperature: any[] = [];

  constructor(private weatherService: WeatherService, private router: Router) {}

  ngOnInit() {
    this.getFavoriteCities();
  }

  getFavoriteCities(): void {
    let storageCities: City[] = [];
    this.favoritesArray = JSON.parse(localStorage.getItem('cities') || "[]");

    this.favoritesArray.forEach(city => {
      let cityIdentity = city.key;
      this.weatherService.getLocationWeather(cityIdentity).pipe(take(1))
      .subscribe(weather => {
        storageCities.push(...weather);
        this.temperature.push(...weather);
      })
    })
  }
}
