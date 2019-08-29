import { Component, OnInit } from '@angular/core';

import { TrickService } from '../../trick/trick.service';
import { UserService } from '../../user/user.service';
import { IInvite } from '../models/invite';
import { ThreadService } from '../thread.service';

@Component({
  selector: 'app-invite-list',
  templateUrl: './invite-list.component.html',
  styleUrls: ['./invite-list.component.scss']
})
export class InviteListComponent implements OnInit {
  invites: IInvite[] = [];

  constructor(
    private threadService: ThreadService,
    private trickService: TrickService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getInvites();
  }

  private getInvites(): void {
    this.threadService.getThreadInvite().subscribe(
      invites => {
        this.invites = invites;
        this.invites.map(
          invite => {
            this.getUser(invite);
            this.getThread(invite);
          }
        );
      });
  }

  getUser(invite: IInvite): void {
    this.userService.getUserById(invite.UserId).subscribe(
      user => invite.user = user
    );
  }

  getThread(invite: IInvite): void {
    this.threadService.getThreadById(invite.ThreadId).subscribe(
      thread => {
        invite.thread = thread;
        this.trickService.getTrickById(thread.trick_id).subscribe(
          trick => invite.trick = trick
        );
      }
    );
  }

  acceptInvite(invite: IInvite): void {
    this.threadService.acceptInvite(invite.id).subscribe(
      () => invite.message = 'Accepted success');
  }

  skipInvite(invite: IInvite): void {
    this.threadService.deleteInvite(invite.id).subscribe(
      () => invite.message = 'Deleted success');
  }
}
