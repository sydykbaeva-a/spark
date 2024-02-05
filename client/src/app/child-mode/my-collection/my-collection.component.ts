import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from './pop-up/pop-up.component';
import { ChildService } from 'src/app/child.service';
import { IChild } from 'src/app/child.interface';
import { last, lastValueFrom } from 'rxjs';
import { DataService } from 'src/app/shared.service';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.scss'],
})
export class MyCollectionComponent implements OnInit {
  children: IChild[] = [];
  disable = false;
  userActivatedItems: number | undefined;
  childId: number = 12;

  constructor(
    private dialog: MatDialog,
    private childService: ChildService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    this.getChildren();
    this.getChildId();
    this.getNumActivated();

    const currChild: IChild = this.children.find(
      (child) => child.child_id === this.childId
    )!;
    console.log(`[onToggleClick] currChild:`, currChild);
    this.userActivatedItems = currChild.number_of_activateItems;
    console.log(`[onToggleClick] userActivatedItems:`, this.userActivatedItems);
  }

  async getChildId() {
    this.dataService.getDataChildId().subscribe((data) => {
      this.childId = data;
      console.log(`MyCollectionComponent > getDataChildId():`, data);
    });
    // const getDataChildId = this.dataService.getDataChildId();
    // this.childId = await lastValueFrom(getDataChildId);
    // console.log(`MyCollectionComponents > this.childId: ${this.childId}`);
  }
  async getNumActivated() {
    this.dataService.getDataNumActivate().subscribe((data) => {
      this.userActivatedItems = data;
      console.log(`MyCollectionComponent > getDataNumActivate(): `, data);
    });
  }

  async getChildren() {
    const userId = this.childService.getCurrentUserId();
    const promise = this.childService.findChildren(userId);
    this.children = await lastValueFrom(promise);
  }

  async onToggleClick(childId: number) {
    // console.log(`[onToggleClick] incoming childId: ${childId}`);
    const currChild: IChild = this.children.find(
      (child) => child.child_id === childId
    )!;
    // console.log(`[onToggleClick] currChild:`, currChild);
    this.userActivatedItems = currChild.number_of_activateItems;
    // console.log(`[onToggleClick] userActivatedItems:`, this.userActivatedItems);

    // this.childId = currChild.child_id!;
    // console.log(`[onToggleClick] this.childId :`, this.childId);
    this.disableCard(this.userActivatedItems!, this.childId);
  }

  openPopUp(prize: string) {
    let dialogRef = this.dialog.open(PopUpComponent, {
      width: '70%',
      height: '70%',
      data: { path: prize },
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  disableCard(numOfOpenItems: number, childId: number): void {
    console.log(`[disableCard] reached with numOfOpenItems:`, numOfOpenItems);
    let cards = document.querySelectorAll(`.disabledCards${childId} .col`);
    cards.forEach((card, i) => {
      console.log(`forEach: card is ${card} and i is ${i}`);
      card.classList.remove('open');
      if (numOfOpenItems > i) {
        card.classList.add('open');
      }
    });
  }
}
