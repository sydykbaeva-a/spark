import { Component, OnInit } from '@angular/core';
import { SignInDialogComponent } from './sign-in-dialog/sign-in-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChildService } from 'src/app/child.service';
import { IUser } from 'src/app/parent.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private route: Router,
    private childService: ChildService
  ) {}
  name!: string;
  surName!: string;

  ngOnInit() {}

  SignIn() {
    this.openDialogToSignIn();
  }

  async SignUp() {
    const user: IUser = {
      first_name: this.name,
      last_name: this.surName,
    };

    const listOfUsers = await this.childService.addUser(user);
    let currentUser: IUser = listOfUsers[listOfUsers.length - 1];
    this.childService.setCurrentUserId(currentUser.user_id!);
    this.route.navigate(['/stepper']);
  }

  openDialogToSignIn() {
    let dialogRef = this.dialog.open(SignInDialogComponent, {
      width: '1000px',
      data: { name: 0 },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.route.navigate(['/stepper']);
    });
  }
}
