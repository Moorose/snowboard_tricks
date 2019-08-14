import { Trick } from '../../models/trick';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trick',
  templateUrl: './trick.component.html',
  styleUrls: ['./trick.component.scss']
})
export class TrickComponent implements OnInit {

  @Input() trick: Trick;

  constructor() { }

  ngOnInit() {
  }

}
