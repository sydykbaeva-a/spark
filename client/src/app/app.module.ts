import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentModeComponent } from './parent-mode/parent-mode.component';
import { ChildModeComponent } from './child-mode/child-mode.component';
import { HttpClientModule } from '@angular/common/http';
import { ChildService } from './child.service';
@NgModule({
  declarations: [
    AppComponent,
    ParentModeComponent,
    ChildModeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ChildService],
  bootstrap: [AppComponent]
})
export class AppModule { }
