import { Component, OnInit } from '@angular/core';
import { SignInDialogComponent } from './sign-in-dialog/sign-in-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChildService } from 'src/app/child.service';
import { IUser } from 'src/app/parent.interface';
import { DataService } from 'src/app/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private route: Router,
    private childService: ChildService,
    private dataService: DataService
  ) {}
  name!: string;
  surName!: string;
  isFlipped = false;
  userId!: string;

  ngOnInit(): void {}

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

    dialogRef.afterClosed().subscribe((path) => {
      console.log('The dialog was closed with data: ', path);

      this.route.navigate([path]);
    });
  }

  chooseUser() {
    console.log(`chooseUser() reached!`);
    if (this.userId == null) {
      console.log('Error with user');
    } else {
      const user = Number(this.userId);
      console.log(`SignInDialogComponent > user: `, user);
      this.childService.setCurrentUserId(user);
      this.dataService.setDataUserId(user);
      this.route.navigate(['/stepper']);
    }
  }
}
