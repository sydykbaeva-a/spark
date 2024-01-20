import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { HabitChildMapInterface } from "./habit-child-map.interface";

@Injectable({
    providedIn: 'root'
})

export class HabitService {
    constructor(private http: HttpClient) { }

    findHabitByUserUrl = 'parent';
    findHabitByUserApi(userId: number): Observable<HabitChildMapInterface[]> {
        return this.http.get<HabitChildMapInterface[]>(`${this.findHabitByUserUrl}/${userId}/habits`).pipe(
            catchError((error) => {
                console.log('Error on getting habits by user');
                console.log(`${this.findHabitByUserUrl}/${userId}/habits`);
                return [];
            })
        );
    }
}

