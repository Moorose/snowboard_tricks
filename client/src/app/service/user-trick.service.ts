import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ITrick } from '../trick/models/trick';
import { IUser } from '../user/model/user';
import { IUserTrick } from '../user/model/userTrick';

@Injectable({
  providedIn: 'root',
})
export class UserTrickService {

  url = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  private static handleError(error: HttpErrorResponse) {
    console.log(error);
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
    return this.http.get<ITrick[]>(`${this.url}/user/${id}/tricks`).pipe(
      catchError(UserTrickService.handleError)
    );
  }

  getUserListByTrickId(id: number): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.url}/tricks/users/${id}`).pipe(
      catchError(UserTrickService.handleError)
    );
  }

  joinTrickToUser(trickId: number, userId?: number): Observable<IUserTrick> {
    if (!userId) {
      userId = environment.currentUser;
    }
    return this.http.post<IUserTrick>(`${this.url}/user/${userId}/tricks/${trickId}`, {}).pipe(
      catchError(UserTrickService.handleError)
    );
  }

  unJoinTrickToUser(trickId: number, userId?: number): Observable<void> {
    if (!userId) {
      userId = environment.currentUser;
    }
    return this.http.delete<void>(`${this.url}/user/${userId}/tricks/${trickId}`).pipe(
      catchError(UserTrickService.handleError)
    );
  }

  markTrick(done: boolean, trickId: number, userId?: number): Observable<IUserTrick> {
    if (!userId) {
      userId = environment.currentUser;
    }
    return this.http.patch<IUserTrick>(`${this.url}/user/${userId}/tricks/${trickId}/mark`, { is_done: done }).pipe(
      catchError(UserTrickService.handleError)
    );
  }

}
