import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from './services/weather.service';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
  
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    WeatherService
  ]
})
export class CoreModule { }
