import { Component, Input, OnInit } from '@angular/core';

import { TrickService } from '../../service/trick.service';
import { ITrick } from '../models/trick';

@Component({
  selector: 'app-trick-list',
  templateUrl: './trick-list.component.html',
  styleUrls: ['./trick-list.component.scss'],
})
export class TrickListComponent implements OnInit {
  @Input() adminRole = true;
  tricks: ITrick[] = [];
  error: string;

  constructor(private trickService: TrickService) {}

  ngOnInit() {
    this.getTricks();
  }

  getTricks() {
    this.trickService.getTrickList().subscribe(
      tricks => this.tricks = tricks,
      error => this.error = error
    );
  }
}
