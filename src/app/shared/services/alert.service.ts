import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AlertService {

  constructor(
    private readonly _snackBarService: MatSnackBar
  ) { }

  private _showMessage<T>(message: string, action?: string, duration?: number, component?: ComponentType<T>) {
    // this._snackBarService.openFromComponent(component!, { duration });
    this._snackBarService.open(message, action, { duration });
  }

  showErrorMessage(message: string, duration?: number) {
    this._showMessage(message, 'Close', duration || 5000);
  }

  showSuccessMessage(message: string, duration?: number) {
    this._showMessage(message, 'Close', duration || 5000);
  }

  showWarningMessage(message: string, duration?: number) {
    this._showMessage(message, 'Close', duration || 5000);
  }
}
