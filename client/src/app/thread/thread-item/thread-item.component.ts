import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../environments/environment';
import { TrickService } from '../../trick/trick.service';
import { IUser } from '../../user/model/user';
import { UserService } from '../../user/user.service';
import { IMessage } from '../models/message';
import { IThread } from '../models/thread';
import { ThreadService } from '../thread.service';

@Component({
  selector: 'app-thread-item',
  templateUrl: './thread-item.component.html',
  styleUrls: ['./thread-item.component.scss']
})
export class ThreadItemComponent implements OnInit {
  currentUser: number = environment.currentUser;
  error: any = null;
  messages: IMessage[] = [];
  users: IUser[] = [];
  thread: IThread = null;

  messageForm: FormGroup = this.fb.group({
    message: ['', [Validators.required, Validators.minLength(1)]],
  });

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private trickService: TrickService,
    private threadService: ThreadService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getThread();
  }

  private getThread(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.threadService.getThreadById(id).subscribe(
      thread => {
        this.thread = thread;
        this.userService.getUserById(thread.user_id).subscribe(
          user => this.thread.user = user
        );
        this.trickService.getTrickById(thread.trick_id).subscribe(
          trick => this.thread.trick = trick
        );
        this.getUsers();
        this.getMessages();
      }
    );
  }

  getUsers(): void {
    this.threadService.getUserByThreadId(this.thread.id).subscribe(
      users => {
        this.users = users;
      }
    );
  }

  getMessages(): void {
    this.threadService.getMessages(this.thread.id).subscribe(
      (messages) => this.messages = messages);
  }

  send(): void {
    const message = this.messageForm.value.message;
    this.messageForm.controls.message.setValue('');
    this.threadService.addMessage(this.thread.id, message).subscribe(
      () => this.getMessages());
  }

  goBack(): void {
    this.location.back();
  }

  getUserByMessage(message: IMessage): string {
    const [user] = this.users.filter(userFromThread => userFromThread.id === message.UserId);
    if (user) {
      return user.nickname;
    }
    return '';
  }

  closeThread(): void {
    this.threadService.closeThread(this.thread.id).subscribe(
      () => this.goBack());
  }

  leaveThread(): void {
    this.threadService.leaveThread(this.thread.id).subscribe(
      () => this.goBack());
  }
}
