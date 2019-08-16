import { Component, OnInit } from '@angular/core';
import { Trick } from 'src/app/trick/models/trick';
import { TrickService } from 'src/app/trick/trick.service';

@Component({
  selector: 'app-trick-list',
  templateUrl: './trick-list.component.html',
  styleUrls: ['./trick-list.component.scss'],
})
export class TrickListComponent implements OnInit {
  tricks: Trick[] = [];
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
