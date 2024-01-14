import { Component, OnInit } from '@angular/core';
import { AddChildService } from '../add-child.service';
import { Child } from '../child.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-parent-mode',
  templateUrl: './parent-mode.component.html',
  styleUrls: ['./parent-mode.component.scss']
})
export class ParentModeComponent implements OnInit{
  children$: Observable<Child[]> = new Observable<Child[]>();
  child$: Observable<Child> = new Observable<Child>();
  childExist = false;
  constructor(private childService: AddChildService){}

  ngOnInit(){
    this.getChildren();
  }

  getChildren(){
    return this.children$ = this.childService.getChildren();
  }

  addingChild() {
    let child: Child;
    let name = prompt("Child Name:");
   
    if(name === null || name === ''){
      console.log("Cancel");
    }else{
      let user = prompt("Child User ID", "3");
      let habitMap = prompt("Child User ID", "3123");
      child = {child_name: name, user_id: Number(user), habit_child_map_id: Number(habitMap)};
      this.children$ = this.childService.addChild(child);
    }
  }

  deleteChild(childId: number){
    this.children$ = this.childService.deleteChild(childId);
  }

  editChild(childId: number, childName: string){
    let name = prompt("Change Child Name:", childName);
    let childEditName = {child_name: name!};
    if(name === null){
      console.log('Cancel Change');
    }else{
      this.children$ = this.childService.editChild(childId, childEditName);
    }
  }

  findingChild(){
    let childId = prompt("Who are you looking for?", '1');
    if(childId === null){
    }else{
      this.childExist = true;
      this.child$ = this.childService.findChild(Number(childId));
    }
  }
}
