import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepperComponent } from './parent-mode/stepper/stepper.component';
import { MyDayComponent } from './child-mode/my-day/my-day.component';
import { HomeComponent } from './parent-mode/home/home.component';

const routes: Routes = [
  { path: 'stepper', component: StepperComponent },
  { path: 'myday', component: MyDayComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
