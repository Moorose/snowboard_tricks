import { Component, OnInit } from '@angular/core';

import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-trick-nav',
  templateUrl: './trick-nav.component.html',
  styleUrls: ['./trick-nav.component.scss']
})
export class TrickNavComponent implements OnInit {
  adminRole: boolean = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.adminRole = this.userService.isAdmin();
  }
}
