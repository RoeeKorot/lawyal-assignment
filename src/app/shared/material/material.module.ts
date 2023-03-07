import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

const MATERIALS = [
  MatTooltipModule,
  MatButtonModule
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MATERIALS
  ]
})
export class MaterialModule { }
