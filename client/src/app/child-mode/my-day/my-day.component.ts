import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IChild } from 'src/app/child.interface';
import { ChildService } from 'src/app/child.service';
import { IHabitChildMap } from 'src/app/habit-child-map.interface';
import { HabitService } from 'src/app/habit.service';

@Component({
  selector: 'app-my-day',
  templateUrl: './my-day.component.html',
  styleUrls: ['./my-day.component.scss'],
})
export class MyDayComponent implements OnInit {
  colors = ['#d06ab2', '#009aff', '#de768c', '#d358ff'];

  habitChildMap: IHabitChildMap[] = [];
  originalHabitChildMap: IHabitChildMap[] = [];
  children!: IChild[];
  currUserId: number = 1;

  constructor(
    private childService: ChildService,
    private habitService: HabitService
  ) {}

  ngOnInit(): void {
    this.filterHabitsbyUser();
    this.findChildren();
  }

  getColorStyle(index: number): string {
    const colorIndex = index % this.colors.length;
    return `background-color: ${this.colors[colorIndex]}`;
  }

  handleClick(index: number, habit: any) {
    this.editHabitChildMap(habit.child_id, habit.habit_id, !habit.habit_status);
    habit.habit_status = !habit.habit_status;

    console.log(
      `handleClick() > value of this.isClicked for habitChildMap table: `,
      habit
    );

    this.checkAllHabitStatusTrue(habit.child_id);
  }

  checkAllHabitStatusTrue(childId: number): boolean {
    // Filter the habitChildMap based on the given child_id
    const filteredHabits = this.habitChildMap.filter(
      (habit) => habit.child_id === childId
    );
    const allHabitsDone = filteredHabits.every((habit) => habit.habit_status);
    if (allHabitsDone) {
      console.log(
        `Congrats! all habits for child_id of ${childId} is ${allHabitsDone}`
      );
    }

    // Check if habit_status is true for all filtered habits
    return filteredHabits.every((habit) => habit.habit_status);
  }

  findChildren() {
    this.childService.findChildren(this.currUserId).subscribe((child_all) => {
      console.log(
        `Filtered child list for user ID ${this.currUserId}: `,
        child_all
      );
      this.children = child_all;
    });
  }

  async filterHabitsbyUser() {
    const habits = await this.habitService.findHabitByUserId(this.currUserId);
    this.originalHabitChildMap = await lastValueFrom(habits);
    this.habitChildMap = [...this.originalHabitChildMap]; // Make a copy
    console.log(
      `Filtered habit list for user ID: ${this.currUserId}`,
      this.habitChildMap
    );
  }

  onToggleClick(toggleChildId: number) {
    console.log('onToggleClick > toggleChildId = ', toggleChildId);
    console.log(
      'onToggleClick > this.habitChildMap.length = ',
      this.habitChildMap.length
    );
    if (toggleChildId === 0) {
      this.habitChildMap = [...this.originalHabitChildMap]; // Reset to original
    } else {
      console.log(
        'onToggleClick > toggleChildId is NOT 0 so applyFilter with toggleChildId = ',
        toggleChildId
      );
      this.applyFilter(toggleChildId);
    }
  }

  applyFilter(childId: number) {
    this.habitChildMap = [...this.originalHabitChildMap]; // Reset to original
    console.log(
      'applyFilter() > this.habitChildMap.length = ',
      this.habitChildMap.length
    );
    const filterValue = childId.toString();

    if (filterValue && this.habitChildMap.length > 0) {
      console.log('applyFilter() > BEFORE applying filter', this.habitChildMap);
      this.habitChildMap = this.habitChildMap.filter((data) => {
        console.log(
          'applyFilter() > AFTER applying filter',
          data.child_id.toString().includes(filterValue)
        );
        return data.child_id.toString().includes(filterValue);
      });
    }
  }

  editHabitChildMap(childId: number, habitId: number, habitStatus: boolean) {
    this.habitService
      .editHabitChildMap(childId, habitId, habitStatus)
      .subscribe();
  }
}
