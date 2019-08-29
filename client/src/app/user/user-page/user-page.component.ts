import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrick } from '../../trick/models/trick';
import { UserTrickService } from '../../trick/user-trick.service';
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
  tricks: ITrick[];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private userTrick: UserTrickService
  ) {
  }

  ngOnInit(): void {
    this.getUser();
    this.getLevel();
    this.getTrick();
  }

  private getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(id).subscribe(
      user => this.user = user
    );
  }

  private getLevel(): void {
    this.userService.getUserLevel().subscribe(
      rank => this.rank = rank
    );
  }

  private getTrick(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userTrick.getTrickListByUserId(id).subscribe(
      tricks => this.tricks = tricks
    );
  }
}
