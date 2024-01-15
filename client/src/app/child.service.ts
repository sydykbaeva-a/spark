import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChild } from './child.interface';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  private baseHttpUrl = '/parent/';
  constructor(private http: HttpClient) {}
  
  
  getChildren(): Observable<IChild[]>{
    const httpUrl = this.baseHttpUrl + 'child';
    return this.http.get<IChild[]>(httpUrl).pipe(
      catchError((error) => {
        console.log('Error on getting children');
        return [];
      })
    );
  }

  findChild(childId: number): Observable<IChild>{
    const httpUrl = this.baseHttpUrl + 'child';
    return this.http.get<IChild>(`${httpUrl}/${childId}`).pipe(
      catchError((error) => {
        console.log('Error on getting a child');
        return [];
      })
    );
  }

  addChild(child: IChild): Observable<IChild[]>{
    const httpUrl = this.baseHttpUrl + 'child_add';
    return this.http.post<IChild[]>(httpUrl, child).pipe(
      catchError((error) => {
        console.log('Error on adding new child');
        return [];
      })
    );
  }

  deleteChild(childId: number): Observable<IChild[]>{
    const httpUrl = this.baseHttpUrl + 'child_delete';
    return this.http.delete<IChild[]>(`${httpUrl}/${childId}`);
  }

  editChild(childId: number, childName: {child_name: string}): Observable<IChild[]>{
    const httpUrl = this.baseHttpUrl + 'child_edit';
    return this.http.patch<IChild[]>(`${httpUrl}/${childId}`, childName);
  }
}
