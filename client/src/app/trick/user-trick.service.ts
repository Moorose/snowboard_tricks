import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { HandleErrorService } from '../handle-error.service';
import { IUser } from '../user/model/user';
import { IUserTrick } from '../user/model/userTrick';

import { ITrick } from './models/trick';

@Injectable({
  providedIn: 'root',
})
export class UserTrickService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getTrickListByUserId(id?: number): Observable<ITrick[]> {
    if (!id) {
      id = environment.currentUser;
    }
    return this.http.get<ITrick[]>(`${this.url}/user/${id}/tricks`).pipe(
      catchError(HandleErrorService.handleError)
    );
  }

  getUserListByTrickId(id: number): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.url}/tricks/users/${id}`).pipe(
      catchError(HandleErrorService.handleError)
    );
  }

  joinTrickToUser(trickId: number, userId?: number): Observable<IUserTrick> {
    if (!userId) {
      userId = environment.currentUser;
    }
    return this.http.post<IUserTrick>(`${this.url}/user/${userId}/tricks/${trickId}`, {}).pipe(
      catchError(HandleErrorService.handleError)
    );
  }

  unJoinTrickToUser(trickId: number, userId?: number): Observable<void> {
    if (!userId) {
      userId = environment.currentUser;
    }
    return this.http.delete<void>(`${this.url}/user/${userId}/tricks/${trickId}`).pipe(
      catchError(HandleErrorService.handleError)
    );
  }

  markTrick(done: boolean, trickId: number, userId?: number): Observable<IUserTrick> {
    if (!userId) {
      userId = environment.currentUser;
    }
    return this.http.patch<IUserTrick>(`${this.url}/user/${userId}/tricks/${trickId}/mark`, { is_done: done }).pipe(
      catchError(HandleErrorService.handleError)
    );
  }
}
