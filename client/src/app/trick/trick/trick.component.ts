import { Component, Input } from '@angular/core';

import { ITrick } from '../models/trick';

@Component({
  selector: 'app-trick',
  templateUrl: './trick.component.html',
  styleUrls: ['./trick.component.scss']
})
export class TrickComponent {
  @Input() trick: ITrick;

  constructor() {
  }
}
