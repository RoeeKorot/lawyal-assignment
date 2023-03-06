import { Component, OnInit } from '@angular/core';
import { SnackbarErrorService } from 'src/app/core/services/snackbar-error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  public snackbarErrMessage: HttpErrorResponse | null = null;
  public showSnackbar: boolean = false;

  constructor(private snackbarService: SnackbarErrorService) {}

  ngOnInit() {
    this.snackbarService.snackbarErrorHandler$.subscribe((message: HttpErrorResponse) => {
      this.snackbarErrMessage = message;
      this.showErrorMessage();
    }) 
  }

  private showErrorMessage() {
    this.showSnackbar = true;
    setTimeout(() => {
      this.showSnackbar = false;
    }, 2900);
  }
}
