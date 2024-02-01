import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SignInDialogComponent } from 'src/app/parent-mode/home/sign-in-dialog/sign-in-dialog.component';

@Component({
  selector: 'app-pop-up-component',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent {
  constructor(public dialogRef: MatDialogRef<SignInDialogComponent>) {}
  ok() {
    this.dialogRef.close();
  }
}
