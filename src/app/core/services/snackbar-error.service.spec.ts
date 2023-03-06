import { TestBed } from '@angular/core/testing';

import { SnackbarErrorService } from './snackbar-error.service';

describe('SnackbarErrorService', () => {
  let service: SnackbarErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackbarErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
