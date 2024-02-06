import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DataService {
  // setup getter/setter for list of children
  private data$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  public getData(): Observable<any> {
    return this.data$.asObservable();
  }

  public setData(data: any): void {
    this.data$.next(data);
  }

  // setup getter/setter for selected childId
  private dataChildId$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  public getDataChildId(): Observable<any> {
    return this.dataChildId$.asObservable();
  }

  public setDataChildId(data: any): void {
    console.log(`SharedService > setDataChildId() for data: `, data);
    this.dataChildId$.next(data);
  }

  // setup getter/setter for # of prizes for selected childId
  private dataNumActivate$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  public getDataNumActivate(): Observable<any> {
    return this.dataNumActivate$.asObservable();
  }

  public setDataNumActivate(data: any): void {
    this.dataNumActivate$.next(data);
  }

  // setup getter/setter for logged-in userId
  private dataUserId$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  public getDataUserId(): Observable<any> {
    return this.dataUserId$.asObservable();
  }

  public setDataUserId(data: any): void {
    this.dataUserId$.next(data);
  }
}
