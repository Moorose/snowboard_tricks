import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';
import { EUser, IUser } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  user: IUser;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUserById(environment.currentUser).subscribe(
      user => this.user = user
    );
  }

  signAsUser(): void {
    environment.currentUser = EUser.USER;
    this.getUser();
  }

  signAsAdmin(): void {
    environment.currentUser = EUser.ADMIN;
    this.getUser();
  }
}
