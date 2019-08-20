import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Trick } from '../models/trick';
import { TrickService } from '../trick.service';

@Component({
  selector: 'app-add-trick',
  templateUrl: './add-trick.component.html',
  styleUrls: ['./add-trick.component.scss'],
})
export class AddTrickComponent {
  error: string;

  trickForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    complexity: [
      '',
      [Validators.required, Validators.min(1), Validators.max(1000)],
    ],
    description: [''],
  });

  constructor(
    private fb: FormBuilder,
    private trickService: TrickService,
    private location: Location,
  ) {}

  save() {
    this.trickService.addTrick(this.trickForm.value as Trick).subscribe(
      () => {
        this.location.back();
      },
      error => this.error = error
    );
  }

  goBack(): void {
    this.location.back();
  }
}
