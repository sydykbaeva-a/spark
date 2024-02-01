import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { IChild } from 'src/app/child.interface';
import { ChildService } from 'src/app/child.service';
import { IHabitChildMap } from 'src/app/habit-child-map.interface';
import { HabitInterface } from 'src/app/habit.interface';
import { HabitService } from 'src/app/habit.service';

@Component({
  selector: 'app-sign-in-dialog',
  templateUrl: './sign-in-dialog.component.html',
  styleUrls: ['./sign-in-dialog.component.scss'],
})
export class SignInDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SignInDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private habitService: HabitService,
    private childService: ChildService
  ) {}
  userId!: string;

  ngOnInit() {}

  chooseUser() {
    if (this.userId == null) {
      console.log('Error with user');
    } else {
      const user = Number(this.userId);
      console.log(`SignInDialogComponent > user: `, user);
      this.childService.setCurrentUserId(user);
    }
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
