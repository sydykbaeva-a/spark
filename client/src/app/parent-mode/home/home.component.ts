import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChildService } from 'src/app/child.service';
import { IUser } from 'src/app/parent.interface';
import { DataService } from 'src/app/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private route: Router,
    private childService: ChildService,
    private dataService: DataService
  ) {}
  name!: string;
  surName!: string;
  isFlipped = false;
  userId!: string;
  user: number = 0;

  SignIn() {
    this.chooseUser();
  }

  async SignUp() {
    const user: IUser = {
      first_name: this.name,
      last_name: this.surName,
    };

    const listOfUsers = await this.childService.addUser(user);
    this.user = listOfUsers[listOfUsers.length - 1].user_id!;
    this.chooseUser();
  }

  chooseUser() {
    if (this.userId === null) {
      console.log('Error with user');
    } else {
      if (this.user === 0) {
        this.user = Number(this.userId);
      }
      console.log(`SignInDialogComponent > user: `, this.user);
      this.childService.setCurrentUserId(this.user);
      this.dataService.setDataUserId(this.user);
      this.route.navigate(['/stepper']);
    }
  }
}
