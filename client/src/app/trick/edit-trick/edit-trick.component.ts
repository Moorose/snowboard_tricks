import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {FormBuilder, Validators} from '@angular/forms';
import {TrickService} from '../trick.service';
import {Trick} from '../models/trick';

@Component({
  selector: 'app-edit-trick',
  templateUrl: './edit-trick.component.html',
  styleUrls: ['./edit-trick.component.scss'],
})
export class EditTrickComponent implements OnInit {
  trickForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    complexity: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
    description: [''],
  });

  trick: Trick = null;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private trickService: TrickService,
    private fb: FormBuilder,
  ) {
  }

  duplicateName = false;

  ngOnInit() {
    this.getTrick();
  }

  getTrick(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.trickService.getTrickById(id).subscribe(trick => {
      this.trick = trick;
      this.trickForm = this.fb.group({
        name: [trick.name, [Validators.required, Validators.minLength(5)]],
        complexity: [trick.complexity, [Validators.required, Validators.min(1), Validators.max(1000)]],
        description: [trick.description],
      });
    });
  }

  onSubmit() {
    this.trick.name = this.trickForm.value.name;
    this.trick.complexity = this.trickForm.value.complexity;
    this.trick.description = this.trickForm.value.description;
    this.trickService.updateTrick(this.trick).subscribe(
      () => {
        this.duplicateName = false;
        this.location.back();
      },
      err => {
        if (err.status === 409) {
          this.duplicateName = true;
        }
      },
    );
  }

  goBack(): void {
    this.location.back();
  }
}
