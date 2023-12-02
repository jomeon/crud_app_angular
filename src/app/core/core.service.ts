import { Injectable } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'okay') {
    this._snackBar.open(message,action, {
      duration: 1000,
      verticalPosition: 'top',
    });
  }
}
