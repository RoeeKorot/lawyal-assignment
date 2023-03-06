import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SnackbarErrorService {
  public snackbarErrorHandler$ = new Subject<HttpErrorResponse>();

  constructor() { }

  public snackbarErrMessage(errorMsg: HttpErrorResponse) {
    this.snackbarErrorHandler$.next(errorMsg);
  }
}
