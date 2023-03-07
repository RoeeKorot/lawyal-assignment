import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './components/favorites/favorites.component';


@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
  CommonModule,
    FavoritesRoutingModule,
    RouterModule
  ]
})
export class FavoritesModule { }
