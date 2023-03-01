import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'weather', pathMatch: 'full' },
  { path: 'weather', loadChildren: () => import('./feature-modules/weather/weather.module').then(m => m.WeatherModule) },
  { path: 'favorites', loadChildren: () => import('./feature-modules/favorites/favorites.module').then(m => m.FavoritesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
