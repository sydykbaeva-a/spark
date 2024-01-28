import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MyDayComponent } from '../child-mode/my-day/my-day.component';
import { ChangeClassDirective } from '../change-class.directive';

@NgModule({
  declarations: [MyDayComponent, ChangeClassDirective],
  imports: [CommonModule, AsyncPipe, MatButtonToggleModule],
  exports: [MyDayComponent, ChangeClassDirective],
})
export class ChildModeModule {}
