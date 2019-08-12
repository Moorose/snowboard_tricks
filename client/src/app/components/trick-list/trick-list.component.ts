import { Component, OnInit } from '@angular/core';
import { Trick } from 'src/app/models/Trick';
import { TriksService } from 'src/app/services/triks.service';

@Component({
  selector: 'app-trick-list',
  templateUrl: './trick-list.component.html',
  styleUrls: ['./trick-list.component.scss'],
})
export class TrickListComponent implements OnInit {
  tricks: Trick[] = [];

  constructor(private trickService: TriksService) {}

  ngOnInit() {
    this.getTricks();
  }

  getTricks() {
    this.trickService.getTrickList().subscribe(
      tricks => {
        console.log(tricks);
        this.tricks = tricks;
      },
      err => {
        console.log('Error: ', err);
      },
    );
  }
}
