import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { IChild } from 'src/app/child.interface';
import { ChildService } from 'src/app/child.service';
import { IHabitChildMap } from 'src/app/habit-child-map.interface';
import { HabitInterface } from 'src/app/habit.interface';
import { HabitService } from 'src/app/habit.service';
import { IChatRequest } from '../../../../../../server/src/ai-assist/model/openai.interface';

@Component({
  selector: 'app-habit-dialog',
  templateUrl: './habit-dialog.component.html',
  styleUrls: ['./habit-dialog.component.scss'],
})
export class HabitDialogComponent {
  habit!: HabitInterface;
  children!: IChild[];
  habitName: string = '';
  editMode = false;
  previoslyCheckedChildIds: number[] = [];
  listOfHabitAndChildMap: IHabitChildMap[] = [];

  aiHabitPlaceholder: string = 'Brush teeth'; //new

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
      if (this.data.habitId) {
        // to understand if user is editing
        this.editHabit(this.data.habitId);
      }
    });
  }

  editHabit(habitId: number) {
    this.editMode = true;
    //Get records only of habitId
    this.listOfHabitAndChildMap = this.data.name.filter(
      (test: { habit_id: number }) => test.habit_id === habitId
    );

    this.listOfHabitAndChildMap.forEach((habitAndChildRecord) => {
      this.habitName = habitAndChildRecord.habit_name!; // input name polluted with habit name
      this.previoslyCheckedChildIds.push(habitAndChildRecord.child_id); // get the previously checked children
    });

    this.children.forEach((child) => {
      // Check if child_id exists in the array of child_ids
      if (this.previoslyCheckedChildIds.includes(child.child_id!)) {
        // Set the checked property to true
        child.checked = true;
      }
    });
  }

  async chosenChildrenAndAddHabit() {
    const currentlyCheckedChildren = this.children.filter(
      (child) => child.checked
    );
    const habit: HabitInterface = { habit_name: this.habitName };
    let habitId: number = 0;

    if (this.editMode) {
      const habit: HabitInterface = {
        habit_name: this.habitName,
        habit_id: this.data.habitId,
      };
      (await this.habitService.editHabit(this.data.habitId, habit)).subscribe();

      // delete Record
      for (const i of this.previoslyCheckedChildIds) {
        const isChildStillChecked = currentlyCheckedChildren.find(
          (child) => child.child_id === i
        );
        if (!isChildStillChecked) {
          const deleteElement = this.listOfHabitAndChildMap.find(
            (j) => j.child_id === i && j.habit_id === habit.habit_id
          );

          const s = await this.habitService.deleteHabitAndChildMap(
            deleteElement!.habit_child_map_id!
          );
          const s2 = await lastValueFrom(s);
          console.log('delete child');
        }
      }

      // add new Record
      let newChosenChildren: IChild[] = [];
      currentlyCheckedChildren.forEach((i) => {
        const addElement = this.previoslyCheckedChildIds.find(
          (childId) => childId === i.child_id
        );
        if (addElement === undefined) {
          newChosenChildren.push(i);
          console.log('add child to add');
        }
      });
      this.addHabitAndChildMap(newChosenChildren, habit.habit_id!);
    } else {
      (await this.habitService.addHabit(habit)).subscribe((data) => {
        if (data.length > 0) {
          const lastElement = data[data.length - 1];

          if (lastElement && 'habit_id' in lastElement) {
            //check if lastElement is not null | underfined AND lastElement has property habit_id
            habitId = lastElement.habit_id as number;
          }
        }
        return this.addHabitAndChildMap(currentlyCheckedChildren, habitId);
      });
    }
  }

  async addHabitAndChildMap(checkedChildren: IChild[], habitId: number) {
    const childrenIds: number[] = checkedChildren
      .map((child) => child.child_id)
      .filter((id): id is number => id !== undefined);

    let habitMap: IHabitChildMap[] = [];
    const test = childrenIds.forEach((element) => {
      habitMap.push({
        child_id: element,
        habit_id: habitId,
        habit_status: false,
      });
    });

    const s = await this.habitService.addHabitChildMap(habitMap);
    const s2 = await firstValueFrom(s);
    console.log('add actual child');
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async openAiHabits() {
    const iChatRequest: IChatRequest = {
      messages: [
        {
          role: 'assistant',
          content:
            'write a unique practical and healthy daily habit for an eight-year-old in 10 words or less that they can do every single day but: (1) do not include a period at the end, (2) do not include double quotation marks, (3) do not include habits related to brushing teeth, (3) do not include references to the number of times per week. Remember: do not end sentence with a period. Do not use double quotes. Since this is a habit for every day, do not use verbs related to starting or beginning a habit.',
        },
      ],
    };
    const habits = await this.habitService.getAiHabit(iChatRequest);
    const aiHabit = (await lastValueFrom(habits)).result.message.content;
    this.habitName = aiHabit ?? '';
  }

  isInputValid(): boolean {
    return this.habitName.trim().length > 0;
  }
}
