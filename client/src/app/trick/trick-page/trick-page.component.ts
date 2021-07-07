import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IThread } from '../../thread/models/thread';
import { ThreadService } from '../../thread/thread.service';
import { ITrick } from '../models/trick';
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

  constructor(
    private route: ActivatedRoute,
    private userTrickService: UserTrickService,
    private threadService: ThreadService,
    private location: Location,
    private trickService: TrickService,
  ) {
  }

  ngOnInit(): void {
    this.getTrick();
  }

  private getTrick(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.trickService.getTrickById(id).subscribe(trick => {
      this.trick = trick;
      this.checkTrickJoinToUser();
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
