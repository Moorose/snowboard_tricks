import { Component, OnInit } from '@angular/core';

import { UserService } from '../../service/user.service';
import { IRank } from '../model/rank';
import { IUser } from '../model/user';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  user: IUser;
  rank: IRank;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUser();
    this.getLevel();
  }

  getUser(): void {
    this.userService.getUserById().subscribe(
      user => this.user = user
    );
  }

  getLevel(): void {
    this.userService.getUserLevel().subscribe(
      rank => this.rank = rank
    );
  }

}
