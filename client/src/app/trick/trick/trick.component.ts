import { Component, Input, OnInit } from '@angular/core';

import { Trick } from '../models/trick';

@Component({
  selector: 'app-trick',
  templateUrl: './trick.component.html',
  styleUrls: ['./trick.component.scss']
})
export class TrickComponent implements OnInit {

  @Input() trick: Trick;

  constructor() {
  }

  ngOnInit() {
  }

}
