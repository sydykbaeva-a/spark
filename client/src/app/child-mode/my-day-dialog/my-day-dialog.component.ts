import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-day-dialog',
  templateUrl: './my-day-dialog.component.html',
  styleUrls: ['./my-day-dialog.component.scss'],
})
export class MyDayDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MyDayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  goToMyPrize() {
    this.route.navigate(['/mycollection']);
    this.dialogRef.close();
  }
}
