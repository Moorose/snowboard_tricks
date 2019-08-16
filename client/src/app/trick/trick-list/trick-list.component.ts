import { Component, OnInit, Input } from '@angular/core';
<<<<<<< HEAD:client/src/app/trick/trick-list/trick-list.component.ts
import { Trick } from 'src/app/trick/models/trick';
import { TrickService } from 'src/app/trick/trick.service';
=======
import { Trick } from 'src/app/models/trick';
import { TrickService } from 'src/app/services/trick.service';
>>>>>>> 49d3b2a24d274ee1a56e423e2627b91b9a873135:client/src/app/components/trick-list/trick-list.component.ts

@Component({
  selector: 'app-trick-list',
  templateUrl: './trick-list.component.html',
  styleUrls: ['./trick-list.component.scss'],
})
export class TrickListComponent implements OnInit {
<<<<<<< HEAD:client/src/app/trick/trick-list/trick-list.component.ts
  @Input() adminRole = true;
=======
  @Input() adminRole = false;
>>>>>>> 49d3b2a24d274ee1a56e423e2627b91b9a873135:client/src/app/components/trick-list/trick-list.component.ts

  tricks: Trick[] = [];
  error: string;

  constructor(private trickService: TrickService) {}

  ngOnInit() {
    this.getTricks();
  }

  getTricks() {
    this.trickService.getTrickList().subscribe(
      tricks => {
        this.tricks = tricks;
      },
      error => this.error = error
    );
  }
}
