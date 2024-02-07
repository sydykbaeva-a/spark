import { Component, OnInit } from '@angular/core';
import { ChildService } from '../../child.service';
import { IChild } from '../../child.interface';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent implements OnInit {
  childDataSource = new MatTableDataSource<IChild>();
  children$ = new Observable<IChild[]>();
  userId = 1;
  childName: string = '';
  invalidInput: boolean = true;
  constructor(
    private childService: ChildService,
    private dataService: DataService
  ) {
    this.userId = childService.getCurrentUserId();
  }

  ngOnInit() {
    this.findChildren();
    this.fetchCurrentUser();
  }

  findChildren() {
    this.childService.findChildren(this.userId).subscribe((child_all) => {
      console.log(
        `Filtered child list for user ID ${this.userId}: `,
        child_all
      );
      this.childDataSource.data = child_all;
      this.dataService.setData(child_all);
    });
  }

  fetchCurrentUser() {
    this.dataService.getDataUserId().subscribe((data) => {
      this.userId = data;
      console.log(`ChildComponent > Current UserId: `, data);
    });
  }

  checkInput() {
    this.childName = this.childName.trim();
    if (this.childName.length > 0) {
      this.invalidInput = false;
    } else {
      this.invalidInput = true;
    }
  }

  async addingChild() {
    this.checkInput();
    const child: IChild = {
      child_name: this.childName,
      user_id: this.userId,
      number_of_activateItems: 0,
    };
    this.childService.addChild(this.userId, child).subscribe((child) => {
      console.log(
        `Add child ID ${this.childName} for parent ${this.userId}: `,
        child
      );
      this.childDataSource.data = child;
      this.dataService.setData(child);
    });
  }

  deleteChild(childId: number, childDelete: boolean) {
    this.childService.deleteChild(this.userId, childId).subscribe(() => {
      console.log(`Child deleted successfully`);
      childDelete = false;
      this.findChildren();
    });
  }

  editChild(childId: number, childName: string, iChild: IChild) {
    this.childService
      .editChild(this.userId, childId, childName, 0)
      .subscribe((child) => {
        console.log(`Edit child ID ${childId} of children: `, child);
        iChild.child_edit = false;
      });
  }

  onEdit(item: any) {
    console.log(`this.childDataSource.data: `, this.childDataSource.data);

    this.childDataSource.data.forEach((element) => {
      element.child_edit = false;
    });
    item.child_edit = true;
  }
}
