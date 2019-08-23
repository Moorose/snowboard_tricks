import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GradeService } from '../../service/grade.service';
import { TrickService } from '../../service/trick.service';
import { ITrick } from '../models/trick';

@Component({
  selector: 'app-trick-page',
  templateUrl: './trick-page.component.html',
  styleUrls: ['./trick-page.component.scss']
})
export class TrickPageComponent implements OnInit {

  trick: ITrick = null;
  favorite = false;
  mark = false;

  constructor(
    private route: ActivatedRoute,
    private gradeService: GradeService,
    private location: Location,
    private trickService: TrickService,
  ) {
  }

  ngOnInit() {
    this.getTrick();
  }

  goBack(): void {
    this.location.back();
  }

  markAsDone(done: boolean) {
    this.gradeService.markTrick(done, this.trick.id).subscribe(
      () => this.mark = done
    );
  }

  addToFavorite() {
    this.gradeService.joinTrickToUser(this.trick.id).subscribe(
      () => this.favorite = true
    );
  }

  removeFromFavorite() {
    this.gradeService.unJoinTrickToUser(
      () => {
        this.favorite = false;
        this.mark = false;
      }
    );
  }

  private getTrick(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.trickService.getTrickById(id).subscribe(trick => this.trick = trick);
  }
}
