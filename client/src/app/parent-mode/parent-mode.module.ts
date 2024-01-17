import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { StepperComponent } from './stepper/stepper.component';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    StepperComponent
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
  ],
  exports: [
    StepperComponent
  ]
})
export class ParentModeModule { }
