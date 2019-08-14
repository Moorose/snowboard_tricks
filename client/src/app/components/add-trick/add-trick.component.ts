import { Trick } from "src/app/models/trick";
import { TrickService } from "../../services/trick.service";
import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";

@Component({
  selector: "app-add-trick",
  templateUrl: "./add-trick.component.html",
  styleUrls: ["./add-trick.component.scss"],
})
export class AddTrickComponent {
  duplicateName: boolean = false;

  trickForm = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(5)]],
    complexity: [
      "",
      [Validators.required, Validators.min(1), Validators.max(1000)],
    ],
    description: [""],
  });

  constructor(
    private fb: FormBuilder,
    private trikService: TrickService,
    private location: Location,
  ) {}

  onSubmit() {
    this.trikService.addTrick(this.trickForm.value as Trick).subscribe(
      trick => {
        this.duplicateName = false;
        this.location.back();
      },
      err => {
        if (err.status == 409) {
          this.duplicateName = true;
        }
      },
    );
  }

  goBack(): void {
    this.location.back();
  }
}
