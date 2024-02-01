import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MyDayComponent } from '../child-mode/my-day/my-day.component';
import { ChangeClassDirective } from '../change-class.directive';
import { MyCollectionComponent } from './my-collection/my-collection.component';
import { PopUpComponent } from './my-collection/pop-up/pop-up.component';
import { NavComponent } from './nav/nav.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MyDayDialogComponent } from './my-day-dialog/my-day-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    MyDayComponent,
    ChangeClassDirective,
    MyCollectionComponent,
    PopUpComponent,
    NavComponent,
    MyDayDialogComponent,
  ],
  imports: [
    CommonModule,
    AsyncPipe,
    MatButtonToggleModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    MatBadgeModule,
    MatDialogModule,
  ],
  exports: [
    MyDayComponent,
    ChangeClassDirective,
    MyCollectionComponent,
    PopUpComponent,
    NavComponent,
    MyDayDialogComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChildModeModule {}
