import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { IChild } from 'src/app/child.interface';
import { ChildService } from 'src/app/child.service';
import { IHabitChildMap } from 'src/app/habit-child-map.interface';
import { HabitService } from 'src/app/habit.service';
import { IUser } from 'src/app/parent.interface';

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
  openItemCollection = false;
  childId: number = 0;

  constructor(
    private childService: ChildService,
    private habitService: HabitService,
    private router: Router
  ) {
    this.currUserId = this.childService.getCurrentUserId();
  }

  ngOnInit(): void {
    this.filterHabitsbyUser();
    this.findChildren();
  }

  getColorStyle(index: number): string {
    const colorIndex = index % this.colors.length;
    return `background-color: ${this.colors[colorIndex]}`;
  }

  async handleClick(habitMapRecord: IHabitChildMap) {
    this.editHabitChildMap(
      habitMapRecord.child_id,
      habitMapRecord.habit_id,
      !habitMapRecord.habit_status
    );
    habitMapRecord.habit_status = !habitMapRecord.habit_status;

    console.log(
      `handleClick() > value of this.isClicked for habitChildMap table: `,
      habitMapRecord
    );

    this.openItemCollection = this.checkAllHabitStatusTrue(
      habitMapRecord.child_id
    );

    if (this.openItemCollection) {
      const promise = await this.childService.findChild(this.childId);
      const child: IChild = await lastValueFrom(promise);
      child.number_of_activateItems! += 1;
      const t = await this.childService.editChild(
        this.currUserId,
        this.childId,
        child.child_name!,
        child.number_of_activateItems!
      );
      const t2 = await lastValueFrom(t);
      this.router.navigate(['/mycollection']);
    }
  }

  checkAllHabitStatusTrue(childId: number): boolean {
    // Filter the habitChildMap based on the given child_id
    const filteredHabits = this.habitChildMap.filter(
      (habitMapRecord) => habitMapRecord.child_id === childId
    );
    const allHabitsDone = filteredHabits.every(
      (habitMapRecord) => habitMapRecord.habit_status
    );
    if (allHabitsDone) {
      console.log(
        `Congrats! all habits for child_id of ${childId} is ${allHabitsDone}`
      );
    }
    this.childId = childId;
    // Check if habit_status is true for all filtered habits
    return allHabitsDone;
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
    console.log(
      'onToggleClick > toggleChildId is NOT 0 so applyFilter with toggleChildId = ',
      toggleChildId
    );
    this.applyFilter(toggleChildId);
  }

  applyFilter(childId: number) {
    this.habitChildMap = [...this.originalHabitChildMap]; // Reset to original

    const filterValue = childId;

    if (filterValue && this.habitChildMap.length > 0) {
      this.habitChildMap = this.habitChildMap.filter((data) => {
        return data.child_id === filterValue ? true : false;
      });
    }
  }

  editHabitChildMap(childId: number, habitId: number, habitStatus: boolean) {
    this.habitService
      .editHabitChildMap(childId, habitId, habitStatus)
      .subscribe();
  }
}
