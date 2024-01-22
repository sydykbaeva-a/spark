import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ChildService } from 'src/app/child.service';
import { IHabitChildMap } from 'src/app/habit-child-map.interface';
import { HabitService } from 'src/app/habit.service';
import { HabitDialogComponent } from './habit-dialog/habit-dialog.component';
import { IChild } from 'src/app/child.interface';

@Component({
  selector: 'app-habit',
  templateUrl: './habit.component.html',
  styleUrls: ['./habit.component.scss'],
})
export class HabitComponent implements OnInit {
  habitChildMapData = new MatTableDataSource<IHabitChildMap>();
  habitChildMapDataDialog: IHabitChildMap[] = [];
  showAdminColumns: boolean = true;
  displayedColumnsHabit: string[] = ['habit', 'child_id', 'child_name'];
  currUserId: number = 1;
  children!: IChild[];

  constructor(
    private habitService: HabitService,
    private childService: ChildService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.filterHabitsbyUser();
  }

  addHabit() {
    let dialogRef = this.dialog.open(HabitDialogComponent, {
      width: '1000px',
      data: { name: this.habitChildMapDataDialog },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.filterHabitsbyUser(result);
    });
  }
  deleteHabit() {}

  filterHabitsbyUser(result?: any) {
    this.currUserId = this.childService.getCurrentUserId();
    const userId = this.currUserId;

    this.habitService.findHabitByUserId(userId).subscribe((habits) => {
      console.log(`Filtered habits for user ID ${userId}: `, habits);
      this.habitChildMapData.data = habits;
      this.habitChildMapDataDialog = habits;
    });
  }

  toggleColumns() {
    this.showAdminColumns = !this.showAdminColumns;
    this.displayedColumnsHabit = this.showAdminColumns
      ? ['habit', 'child_id', 'child_name']
      : ['habit'];
  }
}
