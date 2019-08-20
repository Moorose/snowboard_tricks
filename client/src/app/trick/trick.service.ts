import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Trick } from './models/trick';

@Injectable({
  providedIn: 'root',
})
export class TrickService {

  url = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    if (error.status === 409) {
      return throwError(
        'This name already exist!');
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  getTrickList(): Observable<Trick[]> {
    return this.http.get<Trick[]>(`${this.url}/tricks`).pipe(
      retry(3),
      catchError(TrickService.handleError)
    );
  }

  getTrickById(id: number): Observable<Trick> {
    return this.http.get<Trick>(`${this.url}/tricks/${id}`).pipe(
      catchError(TrickService.handleError)
    );
  }

  addTrick(trick: Trick): Observable<Trick> {
    return this.http.post<Trick>(`${this.url}/tricks`, trick).pipe(
      catchError(TrickService.handleError)
    );
  }

  updateTrick(id: number, trick: Trick): Observable<void> {
    return this.http.patch<void>(`${this.url}/tricks/${id}`, trick).pipe(
      catchError(TrickService.handleError)
    );
  }

}
