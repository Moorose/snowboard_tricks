<<<<<<< HEAD:client/src/app/trick/trick/trick.component.ts
=======
import { Trick } from '../../models/trick';
>>>>>>> 49d3b2a24d274ee1a56e423e2627b91b9a873135:client/src/app/components/trick/trick.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { Trick } from '../models/trick';

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
