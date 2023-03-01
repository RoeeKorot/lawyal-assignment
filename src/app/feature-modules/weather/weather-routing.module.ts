//MODULES
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//COMPONENTS
import { WeatherComponent } from './components/weather/weather.component';

const routes: Routes = [
  { path: '', component: WeatherComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class WeatherRoutingModule { }
