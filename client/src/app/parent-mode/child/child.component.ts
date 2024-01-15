import { Component, OnInit } from '@angular/core';
import { ChildService } from '../../child.service';
import { IChild } from '../../child.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ParentModeComponent implements OnInit{
  children$ = new Observable<IChild[]>();
  child$ = new Observable<IChild>();
  childExist = false;
  constructor(private childService: ChildService){}

  ngOnInit(){
    this.findChildren();
  }

  findChildren(){
    return this.children$ = this.childService.findChildren();
  }

  addingChild() {
    const name = prompt("Child Name:");
   
    if(name === null || name === ''){
      console.log("Cancel");
    }else{
      const user = prompt("Child User ID", "3");
      const habitMap = prompt("Child User ID", "3123");
      const child = {child_name: name, user_id: Number(user), habit_child_map_id: Number(habitMap)};
      this.children$ = this.childService.addChild(child);
    }
  }

  deleteChild(childId: number){
    this.children$ = this.childService.deleteChild(childId);
  }

  editChild(childId: number, childName: string){
    const name = prompt("Change Child Name:", childName);
    const childEditName = {child_name: name!};
    if(name === null){
      console.log('Cancel Change');
    }else{
      this.children$ = this.childService.editChild(childId, childEditName);
    }
  }

  findingChild(){
    const childId = prompt("Who are you looking for?", '1');
    if(childId === null){
    }else{
      this.childExist = true;
      this.child$ = this.childService.findChild(Number(childId));
    }
  }
}
