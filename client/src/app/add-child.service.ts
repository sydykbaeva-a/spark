import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Child } from './child.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddChildService {

  constructor(private http: HttpClient) {}

  getChildren(): Observable<Child[]>{
    let httpUrl = '/parent/child';
    return this.http.get<Child[]>(httpUrl);
  }

  findChild(id: number): Observable<Child>{
    let httpUrl = '/parent/child';
    return this.http.get<Child>(`${httpUrl}/${id}`);
  }

  addChild(childI: Child): Observable<Child[]>{
    let httpUrl = '/parent/child_add';
    return this.http.post<Child[]>(httpUrl, childI);
  }

  deleteChild(childId: number): Observable<Child[]>{
    let httpUrl = '/parent/child_delete';
    return this.http.delete<Child[]>(`${httpUrl}/${childId}`);
  }

  editChild(childId: number, childName: {child_name: string}): Observable<Child[]>{
    let httpUrl = '/parent/child_edit';
    return this.http.patch<Child[]>(`${httpUrl}/${childId}`, childName);
  }
}
