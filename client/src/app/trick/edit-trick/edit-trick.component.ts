import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ITrick } from '../models/trick';
import { TrickService } from '../trick.service';

@Component({
  selector: 'app-edit-trick',
  templateUrl: './edit-trick.component.html',
  styleUrls: ['./edit-trick.component.scss'],
})
export class EditTrickComponent implements OnInit {
  error: string;

  trickForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    complexity: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
    description: [''],
  });

  private trick: ITrick = null;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private trickService: TrickService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.getTrick();
  }

  save(): void {
    const trick = { ...this.trickForm.value };
    this.trickService.updateTrick(this.trick.id, trick).subscribe(
      () => {
        this.location.back();
      },
      error => this.error = error
    );
  }

  private getTrick(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.trickService.getTrickById(id).subscribe(trick => {
      this.trick = trick;
      this.trickForm.controls.name.setValue(trick.name);
      this.trickForm.controls.complexity.setValue(trick.complexity);
      this.trickForm.controls.description.setValue(trick.description);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
