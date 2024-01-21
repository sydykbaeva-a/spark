import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IHabitChildMap } from 'src/app/habit-child-map.interface';
import { HabitService } from 'src/app/habit.service';

@Component({
    selector: 'app-habit',
    templateUrl: './habit.component.html',
    styleUrls: ['./habit.component.scss']
})
export class HabitComponent implements OnInit {
    habitChildMapData = new MatTableDataSource<IHabitChildMap>();
    formUserId!: number;
    showAdminColumns: boolean = true;
    displayedColumnsHabit: string[] = ['habit', 'child_id', 'child_name'];

    constructor(
        private habitService: HabitService
    ) { }


    ngOnInit(): void {
        this.filterHabitsbyUser(1);
    }

    filterHabitsbyUser(defaultUserId?: number) {
        const userId = defaultUserId ?? +this.formUserId;

        this.habitService.findHabitByUserId(userId)
            .subscribe(habits => {
                console.log(`Filtered habits for user ID ${userId}: `, habits);
                this.habitChildMapData.data = habits;
            })
    }

    toggleColumns() {
        this.showAdminColumns = !this.showAdminColumns;
        this.displayedColumnsHabit = this.showAdminColumns ? ['habit', 'child_id', 'child_name'] : ['habit'];
    }

}