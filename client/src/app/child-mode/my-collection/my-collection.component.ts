import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from './pop-up/pop-up.component';
import { ChildService } from 'src/app/child.service';
import { IChild } from 'src/app/child.interface';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.scss'],
})
export class MyCollectionComponent implements OnInit {
  children: IChild[] = [];
  disable = false;
  userActivatedItems: number | undefined;
  childId: number = 0;

  constructor(private dialog: MatDialog, private childService: ChildService) {}

  ngOnInit() {
    this.getChildren();
  }

  async getChildren() {
    const userId = this.childService.getCurrentUserId();
    const promise = this.childService.findChildren(userId);
    this.children = await lastValueFrom(promise);
  }

  async onToggleClick(childId: number) {
    const currChild: IChild = this.children.find(
      (child) => child.child_id === childId
    )!;
    this.userActivatedItems = currChild.number_of_activateItems;
    this.childId = currChild.child_id!;
    this.disableCard(this.userActivatedItems!, this.childId);
  }

  openPopUp() {
    let dialogRef = this.dialog.open(PopUpComponent, {
      width: '1000px',
      height: '1000px',
      data: {},
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  disableCard(numOfOpenItems: number, childId: number): void {
    let cards = document.querySelectorAll(`.disabledCards${childId} .col`);

    cards.forEach((card, i) => {
      card.classList.remove('open');
      if (numOfOpenItems > i) {
        card.classList.add('open');
      }
    });
  }
}
