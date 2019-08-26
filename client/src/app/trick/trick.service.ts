import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { HandleErrorService } from '../handle-error.service';

import { ITrick } from './models/trick';

@Injectable({
  providedIn: 'root',
})
export class TrickService {
  url = environment.apiUrl;

  constructor(private http: HttpClient,
              private handleErrorService: HandleErrorService) {
  }

  getTrickList(): Observable<ITrick[]> {
    return this.http.get<ITrick[]>(`${this.url}/tricks`).pipe(
      retry(3),
      catchError(this.handleErrorService.handleError)
    );
  }

  getTrickById(id: number): Observable<ITrick> {
    return this.http.get<ITrick>(`${this.url}/tricks/${id}`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  addTrick(trick: ITrick): Observable<ITrick> {
    return this.http.post<ITrick>(`${this.url}/tricks`, trick).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  updateTrick(id: number, trick: ITrick): Observable<void> {
    return this.http.patch<void>(`${this.url}/tricks/${id}`, trick).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
