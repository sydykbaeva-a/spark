import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ChildService } from 'src/app/child.service';
import { IHabitChildMap } from 'src/app/habit-child-map.interface';
import { HabitService } from 'src/app/habit.service';
import { HabitDialogComponent } from './habit-dialog/habit-dialog.component';
import { IChild } from 'src/app/child.interface';
import { lastValueFrom } from 'rxjs';

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

  addOrEditHabit(habit?: IHabitChildMap) {
    const habitId = habit?.habit_id;

    let dialogRef = this.dialog.open(HabitDialogComponent, {
      width: '1000px',
      data: { name: this.habitChildMapDataDialog, habitId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.filterHabitsbyUser();
    });
  }
  deleteHabit() {}

  async filterHabitsbyUser() {
    this.currUserId = this.childService.getCurrentUserId();

    const habits = await this.habitService.findHabitByUserId(this.currUserId);
    this.habitChildMapData.data = await lastValueFrom(habits);
    this.habitChildMapDataDialog = await lastValueFrom(habits);

    const allChildHabitMapRecords = await this.habitService.findChildHabitMap();
    const habitChildMapRecord = await lastValueFrom(allChildHabitMapRecords);

    this.habitChildMapDataDialog.forEach((habitMapDialog) => {
      // get che habit_child_map_id and assign to habitChildMapDialog
      const matchingElement = habitChildMapRecord.find(
        (allHabitChildMapRecords) =>
          allHabitChildMapRecords.child_id === habitMapDialog.child_id &&
          allHabitChildMapRecords.habit_id === habitMapDialog.habit_id
      );

      if (matchingElement) {
        habitMapDialog.habit_child_map_id = matchingElement.habit_child_map_id;
      }
    });
  }

  toggleColumns() {
    this.showAdminColumns = !this.showAdminColumns;
    this.displayedColumnsHabit = this.showAdminColumns
      ? ['habit', 'child_id', 'child_name']
      : ['habit'];
  }
}
