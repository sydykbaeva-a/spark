import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildService } from './child.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParentModeModule } from './parent-mode/parent-mode.module';
import { HabitService } from './habit.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ParentModeModule,
  ],
  providers: [ChildService, HabitService],
  bootstrap: [AppComponent],
})
export class AppModule {}
