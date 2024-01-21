import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { IHabitChildMap } from "./habit-child-map.interface";

@Injectable({
    providedIn: 'root'
})

export class HabitService {
    constructor(private http: HttpClient) { }

    private baseHttpUrl = '/parent/';
    findHabitByUserId(userId: number): Observable<IHabitChildMap[]> {
        return this.http.get<IHabitChildMap[]>(`${this.baseHttpUrl}${userId}/habits`).pipe(
            catchError((error) => {
                console.log('Error on getting habits by user');
                console.log(`${this.baseHttpUrl}${userId}/habits`);
                return [];
            })
        );
    }
}

