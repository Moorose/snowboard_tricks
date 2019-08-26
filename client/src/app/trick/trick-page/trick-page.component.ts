import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrick } from '../models/trick';
import { TrickService } from '../trick.service';
import { UserTrickService } from '../user-trick.service';

@Component({
  selector: 'app-trick-page',
  templateUrl: './trick-page.component.html',
  styleUrls: ['./trick-page.component.scss']
})
export class TrickPageComponent implements OnInit {
  trick: ITrick = null;
  favorite: boolean = false;
  mark: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userTrickService: UserTrickService,
    private location: Location,
    private trickService: TrickService,
  ) {
  }

  ngOnInit(): void {
    this.getTrick();
  }

  goBack(): void {
    this.location.back();
  }

  markAsDone(done: boolean): void {
    this.userTrickService.markTrick(done, this.trick.id).subscribe(
      (userTrick) => this.mark = userTrick.is_done
    );
  }

  addToFavorite(): void {
    this.userTrickService.joinTrickToUser(this.trick.id).subscribe(
      (userTrick) => {
        this.mark = userTrick.is_done;
        this.favorite = true;
      }
    );
  }

  removeFromFavorite(): void {
    this.userTrickService.unJoinTrickToUser(this.trick.id).subscribe(
      () => {
        this.favorite = false;
        this.mark = false;
      });
  }

  private getTrick(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.trickService.getTrickById(id).subscribe(trick => {
      this.trick = trick;
      this.checkTrickJoinToUser();
    });
  }

  private checkTrickJoinToUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userTrickService.getTrickListByUserId().subscribe(tricks => tricks.map(
      trick => {
        if (trick.id === id) {
          this.favorite = true;
          if (trick.UserTrick) {
            this.mark = trick.UserTrick.is_done;
          }
        }
      })
    );
  }
}
