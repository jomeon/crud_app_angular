import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { CmpgnAddEditComponent } from './cmpgn-add-edit/cmpgn-add-edit.component';
import {MatFormFieldModule} from '@angular/material/form-field';



// tu chyba nie trzeba tych importow

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
  
})
export class AppComponent {
  title = 'crud-app';

  constructor(private _dialog: MatDialog) {}

  openAddEditCmpgnForm() {
    this._dialog.open(CmpgnAddEditComponent);
  }
  
  
}
