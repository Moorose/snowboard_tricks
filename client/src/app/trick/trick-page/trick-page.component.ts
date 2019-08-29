import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IThread } from '../../thread/models/thread';
import { ThreadService } from '../../thread/thread.service';
import { IUser } from '../../user/model/user';
import { FileService } from '../file.service';
import { ITrick } from '../models/trick';
import { IUrl } from '../models/Url';
import { TrickService } from '../trick.service';
import { UserTrickService } from '../user-trick.service';

@Component({
  selector: 'app-trick-page',
  templateUrl: './trick-page.component.html',
  styleUrls: ['./trick-page.component.scss']
})
export class TrickPageComponent implements OnInit {
  trick: ITrick = null;
  thread: IThread = null;
  favorite: boolean = false;
  url: IUrl;
  users: IUser[];

  constructor(
    private route: ActivatedRoute,
    private userTrickService: UserTrickService,
    private threadService: ThreadService,
    private location: Location,
    private trickService: TrickService,
    private fileService: FileService,
  ) {
  }

  ngOnInit(): void {
    this.getTrick();
  }

  private getTrick(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.trickService.getTrickById(id).subscribe(trick => {
      this.trick = trick;
      this.getUsers();
      this.checkTrickJoinToUser();
      if (trick.videoKey) {
        this.getUrl();
      }
    });
  }

  private getUsers(): void {
    this.userTrickService.getUserListByTrickId(this.trick.id).subscribe(
      users => {
        this.users = users;
        this.users.map(user => this.getUserTrick(user));
      }
    );
  }

  private getUrl(): void {
    this.fileService.getSignedUrlForGet(this.trick.videoKey).subscribe(url => {
      this.url = url;
    });
  }

  private checkTrickJoinToUser(): void {
    this.userTrickService.getTrickListByUserId().subscribe(tricks => {
      tricks.map(
        trick => {
          if (trick.id === this.trick.id) {
            this.trick.UserTrick = trick.UserTrick;
            this.checkThreadToUser();
          }
        });
    });
  }

  private checkThreadToUser(): void {
    this.threadService.getThreadByUserId().subscribe(
      threadList => {
        threadList.map(thread => {
          if (thread.UserTrickId === this.trick.UserTrick.id) {
            this.thread = thread;
          }
        }
        );
      });
  }

  private getUserTrick(user: IUser): void {
    this.userTrickService.getUserTrick(user.id, this.trick.id).subscribe(
      userTrick => {
        user.userTrick = userTrick;
      }
    );
  }

  markAsDone(done: boolean): void {
    this.userTrickService.markTrick(done, this.trick.id).subscribe(
      (userTrick) => this.trick.UserTrick = userTrick
    );
  }

  addToFavorite(): void {
    this.userTrickService.joinTrickToUser(this.trick.id).subscribe(
      (userTrick) => {
        this.trick.UserTrick = userTrick;
      }
    );
  }

  removeFromFavorite(): void {
    this.userTrickService.unJoinTrickToUser(this.trick.id).subscribe(
      () => {
        this.trick.UserTrick = null;
      });
  }

  createThread(): void {
    this.threadService.openThread(this.trick.UserTrick.id).subscribe(
      thread => this.thread = thread,
      error => console.log(error)
    );
  }

  goBack(): void {
    this.location.back();
  }
}
