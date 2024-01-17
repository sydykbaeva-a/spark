import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentModeComponent } from './parent-mode/child/child.component';
import { ChildModeComponent } from './child-mode/my-day/my-day.component';
import { HttpClientModule } from '@angular/common/http';
import { ChildService } from './child.service';
import { StepperComponent } from './parent-mode/stepper/stepper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ParentModeComponent,
    ChildModeComponent,
    StepperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
  ],
  providers: [ChildService],
  bootstrap: [AppComponent]
})
export class AppModule { }
