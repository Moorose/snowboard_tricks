import { Component, OnInit, Input } from "@angular/core";
import { Trick } from "src/app/models/trick";
import { TrickService } from "src/app/services/trick.service";

@Component({
  selector: "app-trick-list",
  templateUrl: "./trick-list.component.html",
  styleUrls: ["./trick-list.component.scss"],
})
export class TrickListComponent implements OnInit {
  @Input() adminRole: boolean = false;

  tricks: Trick[] = [];

  constructor(private trickService: TrickService) {}

  ngOnInit() {
    this.getTricks();
  }

  getTricks() {
    this.trickService.getTrickList().subscribe(
      tricks => {
        this.tricks = tricks;
      },
      err => {
        console.log("Error: ", err);
      },
    );
  }
}
