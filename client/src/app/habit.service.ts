import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';
import { IHabitChildMap } from './habit-child-map.interface';
import { HabitInterface } from './habit.interface';

@Injectable({
  providedIn: 'root',
})
export class HabitService {
  constructor(private http: HttpClient) {}

  private baseHttpUrl = '/parent/';
  private currUserId: number = 0;

  async findHabitByUserId(
    userId: number
  ): Promise<Observable<IHabitChildMap[]>> {
    this.currUserId = userId;
    return await this.http
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

  async editHabit(
    habitId: number,
    habit: HabitInterface
  ): Promise<Observable<HabitInterface[]>> {
    const httpUrl = this.baseHttpUrl + 'habit_edit';
    return await this.http.patch<HabitInterface[]>(
      `${httpUrl}/${habitId}`,
      habit
    );
  }

  async deleteHabitAndChildMap(
    id: number
  ): Promise<Observable<IHabitChildMap[]>> {
    const httpUrl = this.baseHttpUrl + 'habit_child_map';
    return await this.http.delete<IHabitChildMap[]>(`${httpUrl}/${id}`).pipe(
      tap((response) => console.log(response)),
      catchError((error) => {
        console.log('Error on deleting map child');
        return [];
      })
    );
  }

  async addHabitChildMap(
    habitChildMapEntity: IHabitChildMap[]
  ): Promise<Observable<IHabitChildMap[]>> {
    const httpUrl = this.baseHttpUrl + 'habit_child_map_add';
    return await this.http
      .post<IHabitChildMap[]>(httpUrl, habitChildMapEntity)
      .pipe(
        catchError((error) => {
          console.log('Error on adding habitAndChildMap');
          return [];
        })
      );
  }

  async findChildHabitMap(): Promise<Observable<IHabitChildMap[]>> {
    const httpUrl = this.baseHttpUrl + 'habit_child_map';
    return await this.http.get<IHabitChildMap[]>(httpUrl);
  }

  deleteHabit(habitId: number): Observable<HabitInterface[]> {
    const httpUrl = this.baseHttpUrl + 'habit_delete';
    return this.http.delete<HabitInterface[]>(`${httpUrl}/${habitId}`);
  }

}
