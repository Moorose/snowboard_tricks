import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUser } from '../../user/model/user';
import { IUserTrick } from '../../user/model/userTrick';
import { UserService } from '../../user/user.service';
import { FileService } from '../file.service';
import { ITrick } from '../models/trick';
import { IUrl } from '../models/Url';
import { TrickService } from '../trick.service';
import { UserTrickService } from '../user-trick.service';

@Component({
  selector: 'app-user-trick-page',
  templateUrl: './user-trick-page.component.html',
  styleUrls: ['./user-trick-page.component.scss']
})
export class UserTrickPageComponent implements OnInit {
  trick: ITrick;
  user: IUser;
  userTrick: IUserTrick;
  url: IUrl;

  constructor(
    private route: ActivatedRoute,
    private userTrickService: UserTrickService,
    private userService: UserService,
    private location: Location,
    private trickService: TrickService,
    private fileService: FileService,
  ) {
  }

  ngOnInit(): void {
    this.getTrick();
    this.getUser();
    this.getUserTrick();
  }

  private getUser(): void {
    const id = +this.route.snapshot.paramMap.get('userId');
    this.userService.getUserById(id).subscribe(
      user => this.user = user
    );
  }

  private getTrick(): void {
    const id = +this.route.snapshot.paramMap.get('trickId');
    this.trickService.getTrickById(id).subscribe(
      trick => this.trick = trick
    );
  }

  private getUserTrick(): void {
    const trickId = +this.route.snapshot.paramMap.get('trickId');
    const userId = +this.route.snapshot.paramMap.get('userId');
    this.userTrickService.getUserTrick(userId, trickId).subscribe(
      userTrick => {
        this.userTrick = userTrick;
        this.getUrl();
      }
    );
  }

  private getUrl(): void {
    this.fileService.getSignedUrlForGet(this.userTrick.videoKey).subscribe(url => {
      this.url = url;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
