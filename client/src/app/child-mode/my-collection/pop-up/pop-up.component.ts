import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pop-up-component',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent {
  constructor(
    public dialogRef: MatDialogRef<PopUpComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { path: string }
  ) {}

  ngOnInit() {
    console.log(this.data.path);
  }

  ok() {
    this.dialogRef.close();
  }
  spark() {
    this.router.navigateByUrl(
      'https://c129a0a7-9060-460e-a16d-04f8b42b3892-00-1hbtra07tb5bp.picard.replit.dev/spark.html'
    );
  }
}
