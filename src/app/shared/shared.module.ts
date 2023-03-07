import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { SnackbarComponent } from './components/snackbar/snackbar.component';



@NgModule({
  declarations: [
    SnackbarComponent,
  ],
  imports: [
  CommonModule,
    MaterialModule
  ],
  exports: [
    SnackbarComponent,
    MaterialModule
  ]
})
export class SharedModule { }
