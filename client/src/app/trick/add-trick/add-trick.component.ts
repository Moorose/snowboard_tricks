import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { TrickService } from '../trick.service';
import { Trick } from '../models/trick';

@Component({
  selector: 'app-add-trick',
  templateUrl: './add-trick.component.html',
  styleUrls: ['./add-trick.component.scss'],
})
export class AddTrickComponent {
  duplicateName = false;

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
    private trikService: TrickService,
    private location: Location,
  ) {}

  save() {
    this.trikService.addTrick(this.trickForm.value as Trick).subscribe(
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
