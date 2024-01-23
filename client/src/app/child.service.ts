import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChild } from './child.interface';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChildService {
  private baseHttpUrl = '/parent/';
  private currUserId!: number;
  constructor(private http: HttpClient) {}

  setCurrentUserId(userId: number) {
    this.currUserId = userId;
  }

  getCurrentUserId(): number {
    return this.currUserId;
  }

  findChildren(userId: number): Observable<IChild[]> {
    const httpUrl = this.baseHttpUrl + userId + '/children';
    return this.http.get<IChild[]>(httpUrl).pipe(
      catchError((error) => {
        console.log('Error on getting children');
        return [];
      })
    );
  }

  findChild(childId: number): Observable<IChild> {
    const httpUrl = this.baseHttpUrl + 'child';
    return this.http.get<IChild>(`${httpUrl}/${childId}`).pipe(
      catchError((error) => {
        console.log('Error on getting a child');
        return [];
      })
    );
  }

  addChild(userId: number, child: IChild): Observable<IChild[]> {
    const httpUrl = this.baseHttpUrl + userId + '/child_add';
    return this.http.post<IChild[]>(httpUrl, child).pipe(
      tap((response) => {
        console.log(response);
      }),
      catchError((error) => {
        console.log('Error on adding new child');
        return [];
      })
    );
  }

  deleteChild(userId: number, childId: number): Observable<IChild[]> {
    const httpUrl = this.baseHttpUrl + userId + '/child_delete';
    return this.http.delete<IChild[]>(`${httpUrl}/${childId}`);
  }

  editChild(
    userId: number,
    childId: number,
    childName: string
    // childName: { child_name: string }
  ): Observable<IChild[]> {
    const childNameObj: IChild = {
      child_name: childName,
      user_id: userId
    };
    const httpUrl = this.baseHttpUrl + userId + '/child_edit';
    return this.http.patch<IChild[]>(`${httpUrl}/${childId}`, childNameObj);
  }
}
