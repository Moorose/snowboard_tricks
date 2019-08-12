import { Trick } from './../models/Trick';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TriksService {

  url:string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTrickList(): Observable<Trick[]> {
    return this.http.get<Trick[]>(`${this.url}/tricks`);
    // return this.http.get('assets/tricks.json');
  }
}

  // getHeroes (): Observable<Hero[]> {
  //   return this.http.get<Hero[]>(this.heroesUrl)
  //     .pipe(
  //       tap(_ => this.log('fetched heroes')),
  //       catchError(this.handleError<Hero[]>('getHeroes', []))
  //     );
  // }