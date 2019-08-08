import { Injectable } from '@angular/core';
import { Trick } from '../models/Trick';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriksService {

  triks:Trick[];

  constructor() {
    this.triks = [];
    for (let index = 0; index < 10; index++) {
      let trick: Trick = {
        id: index,
        name:'Test trick',
        complexity: 100,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
      this.triks.push(trick);
    }
  }

  getTrickList(): Observable<Trick[]> {
    return of(this.triks);
  }
}
