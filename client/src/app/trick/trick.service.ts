import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Trick } from './models/trick';

@Injectable({
  providedIn: 'root',
})
export class TrickService {
  url = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getTrickList(): Observable<Trick[]> {
    return this.http.get<Trick[]>(`${this.url}/tricks`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getTrickById(id: number): Observable<Trick> {
    return this.http.get<Trick>(`${this.url}/tricks/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addTrick(trick: Trick): Observable<Trick> {
    return this.http.post<Trick>(`${this.url}/tricks`, trick, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateTrick(trick: Trick): Observable<void> {
    return this.http.patch<void>(`${this.url}/tricks`, trick, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}
