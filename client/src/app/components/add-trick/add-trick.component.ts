import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-trick',
  templateUrl: './add-trick.component.html',
  styleUrls: ['./add-trick.component.scss']
})
export class AddTrickComponent implements OnInit {

  trickForm = new FormGroup({
    name: new FormControl(''),
    complexity: new FormControl(''),
    description: new FormControl(''),
  });

  constructor() { }

  ngOnInit() {
  }

  // this.heroService.addHero({ name } as Hero)
  // .subscribe(hero => {
  //   this.heroes.push(hero);
  // });

  onSubmit() {
    console.warn(this.trickForm.value);
  }

}
