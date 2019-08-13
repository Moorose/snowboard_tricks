import { Trick } from './../models/Trick';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TriksService {
  url = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getTrickList(): Observable<Trick[]> {
    return this.http.get<Trick[]>(`${this.url}/tricks`);
    // return this.http.get('assets/tricks.json');
  }

  // addTrick(trick: Trick): Observable<Trick[]> {
  //   return this.http.post<Trick>(`${this.url}/tricks`, trick, this.httpOptions).pipe()
  // }

}
// /** POST: add a new hero to the server */
// addHero (hero: Hero): Observable<Hero> {
//   return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
//     tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
//     catchError(this.handleError<Hero>('addHero'))
//   );
// }

// getHeroes (): Observable<Hero[]> {
//   return this.http.get<Hero[]>(this.heroesUrl)
//     .pipe(
//       tap(_ => this.log('fetched heroes')),
//       catchError(this.handleError<Hero[]>('getHeroes', []))
//     );
// }
