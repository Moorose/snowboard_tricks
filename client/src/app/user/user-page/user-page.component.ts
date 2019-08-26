import { Component, OnInit } from '@angular/core';

import { IRank } from '../model/rank';
import { IUser } from '../model/user';
import { UserService } from '../user.service';

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

  ngOnInit(): void {
    this.getUser();
    this.getLevel();
  }

  private getUser(): void {
    this.userService.getUserById().subscribe(
      user => this.user = user
    );
  }

  private getLevel(): void {
    this.userService.getUserLevel().subscribe(
      rank => this.rank = rank
    );
  }
}
