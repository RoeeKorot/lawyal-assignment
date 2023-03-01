import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/core/services/weather.service';
import { WeatherData } from './../../interfaces/weather-data.interface';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  public weatherData!: WeatherData;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    // this.weatherService.getCityByName('Tel Aviv').subscribe((data: WeatherData) => {
    //   this.weatherData = data;
    // })  

  }
}
