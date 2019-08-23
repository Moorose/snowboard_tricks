import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';
import { UserService } from '../../service/user.service';
import { IUser } from '../model/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  user: IUser;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUserById(environment.currentUser).subscribe(
      user => this.user = user
    );
  }

  signAsUser() {
    environment.currentUser = 1;
    this.getUser();
  }

  signAsAdmin() {
    environment.currentUser = 2;
    this.getUser();
  }
}
