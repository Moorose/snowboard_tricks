import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TrickService } from '../trick.service';

@Component({
  selector: 'app-add-trick',
  templateUrl: './add-trick.component.html',
  styleUrls: ['./add-trick.component.scss'],
})
export class AddTrickComponent {
  error: string;

  trickForm: FormGroup = this.fb.group({
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

  save(): void {
    this.trickService.addTrick(this.trickForm.value).subscribe(
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
