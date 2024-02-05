import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { IChild } from 'src/app/child.interface';
import { ChildService } from 'src/app/child.service';
import { IHabitChildMap } from 'src/app/habit-child-map.interface';
import { HabitService } from 'src/app/habit.service';
import { IUser } from 'src/app/parent.interface';
import { MyDayDialogComponent } from '../my-day-dialog/my-day-dialog.component';
import { DataService } from 'src/app/shared.service';

@Component({
  selector: 'app-my-day',
  templateUrl: './my-day.component.html',
  styleUrls: ['./my-day.component.scss'],
})
export class MyDayComponent implements OnInit {
  // colors = ['#d06ab2', '#009aff', '#de768c', '#d358ff'];
  colors = [
    'rgb(208 106 178 / 90%)',
    'rgb(0 154 255 / 90%)',
    'rgb(222 118 140 / 90%)',
    'rgb(211 88 255 / 90%)',
  ];

  habitChildMap: IHabitChildMap[] = [];
  originalHabitChildMap: IHabitChildMap[] = [];
  children!: IChild[];
  currUserId: number = 1;
  openItemCollection = false;
  childId: number = 0;

  constructor(
    private childService: ChildService,
    private habitService: HabitService,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2,
    private dialog: MatDialog,
    private dataService: DataService
  ) {
    this.currUserId = this.childService.getCurrentUserId();
  }

  ngOnInit(): void {
    this.importBootstrapCSS();
    this.filterHabitsbyUser();
    this.findChildren();
    this.fetchCurrentUser();
  }

  openDialog() {
    let dialogRef = setTimeout(
      () =>
        this.dialog.open(MyDayDialogComponent, {
          width: '600px',
        }),
      2000
    );
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
      this.childService.setCurrentChild(this.childId);
      child.number_of_activateItems! += 1;

      const editChild = await this.childService.editChild(
        this.currUserId,
        this.childId,
        child.child_name!,
        child.number_of_activateItems!
      );
      const t2 = await lastValueFrom(editChild);
      this.dataService.setDataNumActivate(child.number_of_activateItems!);
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
      this.triggerConfetti();
      this.openDialog();
      console.log(
        `Congrats! all habits for child_id of ${childId} is ${allHabitsDone}`
      );
    }
    this.childId = childId;
    // Check if habit_status is true for all filtered habits
    return allHabitsDone;
  }

  triggerConfetti(): void {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.text = `
    const end = Date.now() + 15 * 1000;

// go Buckeyes!
// const colors = ["#bb0000", "#ffffff"];
const colors = ['#d06ab2', '#009aff', '#de768c', '#d358ff'];


(function frame() {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors,
  });

  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors,
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
})();    
    `;
    this.renderer.appendChild(this.el.nativeElement, script);
  }

  findChildren() {
    console.log(`MyDayComponent > what is this.currUserId?`, this.currUserId);
    this.childService.findChildren(this.currUserId).subscribe((child_all) => {
      console.log(
        `Filtered child list for user ID ${this.currUserId}: `,
        child_all
      );
      this.children = child_all;
    });
  }

  fetchCurrentUser() {
    this.dataService.getDataUserId().subscribe((data) => {
      this.currUserId = data;
      console.log(`MyDayComponent > Current UserId: `, data);
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
    this.dataService.setDataChildId(toggleChildId);
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

  importBootstrapCSS(): void {
    // Dynamically add Bootstrap stylesheet link
    const link = this.renderer.createElement('link');
    this.renderer.setAttribute(link, 'rel', 'stylesheet');
    this.renderer.setAttribute(
      link,
      'href',
      'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css'
    );
    this.renderer.appendChild(this.el.nativeElement, link);

    const mdbLink = this.renderer.createElement('link');
    this.renderer.setAttribute(mdbLink, 'rel', 'stylesheet');
    this.renderer.setAttribute(
      mdbLink,
      'href',
      'https://mdbcdn.b-cdn.net/wp-content/themes/mdbootstrap4/docs-app/css/compiled-4.20.0.min.css'
    );
    this.renderer.appendChild(this.el.nativeElement, mdbLink);
  }
}
