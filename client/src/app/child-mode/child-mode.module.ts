import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MyDayComponent } from '../child-mode/my-day/my-day.component';
import { ChangeClassDirective } from '../change-class.directive';
import { MyCollectionComponent } from './my-collection/my-collection.component';
import { PopUpComponent } from './my-collection/pop-up/pop-up.component';
import { MatButton, MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    MyDayComponent,
    ChangeClassDirective,
    MyCollectionComponent,
    PopUpComponent,
  ],
  imports: [CommonModule, AsyncPipe, MatButtonToggleModule, MatButtonModule],
  exports: [
    MyDayComponent,
    ChangeClassDirective,
    MyCollectionComponent,
    PopUpComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChildModeModule {}
