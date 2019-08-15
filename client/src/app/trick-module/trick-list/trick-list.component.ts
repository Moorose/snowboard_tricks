import { Component, OnInit } from '@angular/core';
import { Trick } from 'src/app/trick-module/models/trick';
import { TrickService } from 'src/app/trick-module/trick.service';

@Component({
  selector: 'app-trick-list',
  templateUrl: './trick-list.component.html',
  styleUrls: ['./trick-list.component.scss'],
})
export class TrickListComponent implements OnInit {
  tricks: Trick[] = [];

  constructor(private trickService: TrickService) {}

  ngOnInit() {
    this.getTricks();
  }

  getTricks() {
    this.trickService.getTrickList().subscribe(
      tricks => {
        this.tricks = tricks;
      },
      err => {
        console.log('Error: ', err);
      },
    );
  }
}
