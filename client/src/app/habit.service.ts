import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { IHabitChildMap } from './habit-child-map.interface';
import { HabitInterface } from './habit.interface';

@Injectable({
  providedIn: 'root',
})
export class HabitService {
  constructor(private http: HttpClient) {}

  private baseHttpUrl = '/parent/';
  private currUserId: number = 0;

  findHabitByUserId(userId: number): Observable<IHabitChildMap[]> {
    this.currUserId = userId;
    return this.http
      .get<IHabitChildMap[]>(`${this.baseHttpUrl}${userId}/habits`)
      .pipe(
        catchError((error) => {
          console.log('Error on getting habits by user');
          console.log(`${this.baseHttpUrl}${userId}/habits`);
          return [];
        })
      );
  }

  async addHabit(habit: HabitInterface): Promise<Observable<HabitInterface[]>> {
    const httpUrl = this.baseHttpUrl + 'habit_add';
    return await this.http.post<HabitInterface[]>(httpUrl, habit).pipe(
      catchError((error) => {
        console.log('Error on adding habit');
        return [];
      })
    );
  }

  addHabitChildMap(
    habitChildMapEntity: IHabitChildMap[]
  ): Observable<IHabitChildMap[]> {
    const httpUrl = this.baseHttpUrl + 'habit_child_map_add';
    return this.http.post<IHabitChildMap[]>(httpUrl, habitChildMapEntity).pipe(
      catchError((error) => {
        console.log('Error on adding habitAndChildMap');
        return [];
      })
    );
  }
}
