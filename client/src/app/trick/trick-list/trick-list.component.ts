import { Component, OnInit } from '@angular/core';

import { UserService } from '../../user/user.service';
import { ITrick } from '../models/trick';
import { TrickService } from '../trick.service';

@Component({
  selector: 'app-trick-list',
  templateUrl: './trick-list.component.html',
  styleUrls: ['./trick-list.component.scss'],
})
export class TrickListComponent implements OnInit {
  adminRole: boolean = false;
  tricks: ITrick[] = [];
  error: string;

  constructor(private trickService: TrickService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.adminRole = this.userService.isAdmin();
    this.getTricks();
  }

  getTricks(): void {
    this.trickService.getTrickList().subscribe(
      tricks => this.tricks = tricks,
      error => this.error = error
    );
  }
}
