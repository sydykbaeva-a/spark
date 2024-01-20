import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { StepperComponent } from './stepper/stepper.component';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ParentModeComponent } from './child/child.component';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HabitComponent } from './habit/habit.component';

@NgModule({
  declarations: [
    ParentModeComponent,
    StepperComponent,
    HabitComponent
  ],
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
    MatSlideToggleModule
  ],
  exports: [
    ParentModeComponent,
    StepperComponent,
    HabitComponent
  ]
})
export class ParentModeModule { }
