import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MyDayComponent } from '../child-mode/my-day/my-day.component';
import { ChangeClassDirective } from '../change-class.directive';

@NgModule({
  declarations: [MyDayComponent, ChangeClassDirective],
  imports: [
    CommonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
    MatTableModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonToggleModule,
  ],
  exports: [MyDayComponent, ChangeClassDirective],
})
export class ChildModeModule {}
