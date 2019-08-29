import { Component, OnInit } from '@angular/core';

import { TrickService } from '../../trick/trick.service';
import { UserService } from '../../user/user.service';
import { IThread } from '../models/thread';
import { ThreadService } from '../thread.service';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.scss']
})
export class ThreadListComponent implements OnInit {
  threadList: IThread[] = null;

  constructor(
    private threadService: ThreadService,
    private trickService: TrickService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getAllThread();
  }

  getAllThread(): void {
    this.threadService.getThreadByUserId().subscribe(
      threadList => {
        this.threadList = threadList;
        this.threadList.map(thread => {
          this.getUser(thread);
          this.getTrick(thread);
        });
      }
    );
  }

  getUser(thread: IThread): void {
    this.userService.getUserById(thread.user_id).subscribe(
      user => thread.user = user
    );
  }
  getTrick(thread: IThread): void {
    this.trickService.getTrickById(thread.trick_id).subscribe(
      trick => thread.trick = trick
    );
  }
}
