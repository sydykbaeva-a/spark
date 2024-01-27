import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { StepperComponent } from './stepper/stepper.component';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChildComponent } from './child/child.component';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HabitComponent } from './habit/habit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HabitDialogComponent } from './habit/habit-dialog/habit-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HomeComponent } from './home/home.component';
import { SignInDialogComponent } from './home/sign-in-dialog/sign-in-dialog.component';

@NgModule({
  declarations: [
    ChildComponent,
    StepperComponent,
    HabitComponent,
    HabitDialogComponent,
    HomeComponent,
    SignInDialogComponent,
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
    MatSlideToggleModule,
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonToggleModule,
  ],
  exports: [
    ChildComponent,
    StepperComponent,
    HabitComponent,
    HabitDialogComponent,
    HomeComponent,
    SignInDialogComponent,
  ],
})
export class ParentModeModule {}
