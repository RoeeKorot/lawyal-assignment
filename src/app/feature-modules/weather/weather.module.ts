import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { WeatherRoutingModule } from '@weather/weather-routing.module';
import { WeatherComponent } from '@weather/components/weather/weather.component';

@NgModule({
  declarations: [
    WeatherComponent
  ],
  imports: [
  CommonModule,
    WeatherRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class WeatherModule { }
