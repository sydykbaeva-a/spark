import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IChild } from 'src/app/child.interface';
import { ChildService } from 'src/app/child.service';
import { IHabitChildMap } from 'src/app/habit-child-map.interface';
import { HabitInterface } from 'src/app/habit.interface';
import { HabitService } from 'src/app/habit.service';

@Component({
  selector: 'app-habit-dialog',
  templateUrl: './habit-dialog.component.html',
  styleUrls: ['./habit-dialog.component.scss'],
})
export class HabitDialogComponent {
  habit!: HabitInterface;
  children!: IChild[];
  habitName!: string;

  constructor(
    public dialogRef: MatDialogRef<HabitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private habitService: HabitService,
    private childService: ChildService
  ) {}

  ngOnInit() {
    const currUserId = this.childService.getCurrentUserId();
    this.childService.findChildren(currUserId).subscribe((data) => {
      this.children = data;
    });
  }

  async chosenChildrenAndAddHabit() {
    const chosenChildren = this.children.filter((child) => child.checked);
    const habit: HabitInterface = { habit_name: this.habitName };
    let habitId: number = 0;

    (await this.habitService.addHabit(habit)).subscribe((data) => {
      const flattenedData = data.flat();

      if (flattenedData.length > 0) {
        const lastElement = flattenedData[flattenedData.length - 1];

        if (lastElement && 'habit_id' in lastElement) {
          habitId = lastElement.habit_id as number;
        }
      }
      return this.addHabitAndChildMap(chosenChildren, habitId);
    });
  }

  addHabitAndChildMap(checkedChildren: IChild[], habitId: number) {
    const childrenIds: number[] = checkedChildren
      .map((child) => child.child_id)
      .filter((id): id is number => id !== undefined);

    let habitMap: IHabitChildMap[] = [];
    const test = childrenIds.map((element) => {
      console.log(element);

      habitMap.push({
        child_id: element,
        habit_id: habitId,
        habit_status: false,
      });
    });

    this.habitService.addHabitChildMap(habitMap).subscribe(() => {});

    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
