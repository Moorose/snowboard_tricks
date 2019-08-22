import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ITrick } from '../trick/models/trick';
import { IUser } from "../user/model/user";

@Injectable({
  providedIn: 'root',
})
export class GradeService {

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

  getTrickListByUserId(id?: number): Observable<ITrick[]> {
    if (!id) {
      id = environment.currentUser;
    }
    return this.http.get<ITrick[]>(`${this.url}/grade/user/${id}/tricks`).pipe(
      catchError(GradeService.handleError)
    );
  }

  getUserListByTrickId(id: number): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.url}/grade/tricks/${id}`).pipe(
      catchError(GradeService.handleError)
    );
  }

  joinTrickToUser(trickId: number, userId?: number): Observable<void> {
    if (!userId) {
      userId = environment.currentUser;
    }
    return this.http.post<void>(`${this.url}/grade/user/${userId}/tricks/${trickId}`, {}).pipe(
      catchError(GradeService.handleError)
    );
  }

  unJoinTrickToUser(trickId: number, userId?: number): Observable<void> {
    if (!userId) {
      userId = environment.currentUser;
    }
    return this.http.delete<void>(`${this.url}/grade/user/${userId}/tricks/${trickId}`).pipe(
      catchError(GradeService.handleError)
    );
  }

  markTrick(done: boolean, trickId: number, userId?: number): Observable<void> {
    if (!userId) {
      userId = environment.currentUser;
    }
    return this.http.patch<void>(`${this.url}/grade/user/${userId}/tricks/:trickId${trickId}`, { is_done: done }).pipe(
      catchError(GradeService.handleError)
    );
  }

}
