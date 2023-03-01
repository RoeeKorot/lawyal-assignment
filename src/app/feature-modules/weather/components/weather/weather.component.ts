import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/core/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  public weatherData = {};

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getCityByName('Tel Aviv').subscribe(res => {
      this.weatherData = res;
      console.log(res);
    })  

  }
}
