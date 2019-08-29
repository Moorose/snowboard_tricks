import { Component, OnInit } from '@angular/core';

import { ITrick } from '../models/trick';
import { UserTrickService } from '../user-trick.service';

@Component({
  selector: 'app-my-trick',
  templateUrl: './my-trick.component.html',
  styleUrls: ['./my-trick.component.scss']
})
export class MyTrickComponent implements OnInit {
  tricks: ITrick[] = [];
  error: string;

  constructor(
    private userTrickService: UserTrickService,
  ) {
  }

  ngOnInit(): void {
    this.getTricks();
  }

  getTricks(): void {
    this.userTrickService.getTrickListByUserId().subscribe(
      tricks => this.tricks = tricks,
      error => this.error = error
    );
  }
}
