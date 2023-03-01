import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WeatherService } from './services/weather.service';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
  
    HeaderComponent
  ],
  imports: [
  CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    WeatherService
  ]
})
export class CoreModule { }
