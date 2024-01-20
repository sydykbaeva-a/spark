import { Component, OnInit } from '@angular/core';
import { ChildService } from '../../child.service';
import { IChild } from '../../child.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ParentModeComponent implements OnInit {
  children$ = new Observable<IChild[]>();
  userId = 1;
  childName!: string;
  invalidInput: boolean = true;
  constructor(private childService: ChildService) {}

  ngOnInit() {
    this.chooseUser();
    this.findChildren();
  }

  findChildren() {
    return (this.children$ = this.childService.findChildren(this.userId));
  }

  checkInput() {
    if (this.childName.length > 0) {
      this.invalidInput = false;
    } else {
      this.invalidInput = true;
    }
  }

  addingChild() {
    const child: IChild = {
      child_name: this.childName,
      user_id: this.userId,
    };
    this.children$ = this.childService.addChild(this.userId, child);
  }

  deleteChild(childId: number) {
    this.children$ = this.childService.deleteChild(this.userId, childId);
  }

  editChild(childId: number, childName: string) {
    const name = prompt('Change Child Name:', childName);
    const childEditName = { child_name: name! };
    this.children$ = this.childService.editChild(
      this.userId,
      childId,
      childEditName
    );
  }

  chooseUser() {
    let user = prompt('Choose userId: ', '1');
    if (user == null) {
      console.log('Error with user');
    } else {
      this.userId = Number(user);
      this.findChildren();
    }
  }
}
