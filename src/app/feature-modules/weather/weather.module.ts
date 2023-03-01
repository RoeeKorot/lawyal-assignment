import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './components/weather/weather.component';


@NgModule({
  declarations: [
    WeatherComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule
  ]
})
export class WeatherModule { }
