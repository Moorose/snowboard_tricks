import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { HandleErrorService } from '../handle-error.service';

import { IRank } from './model/rank';
import { IUser } from './model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getUserList(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.url}/user`).pipe(
      catchError(HandleErrorService.handleError)
    );
  }

  getUserById(id?: number): Observable<IUser> {
    if (!id) {
      id = environment.currentUser;
    }
    return this.http.get<IUser>(`${this.url}/user/${id}`).pipe(
      catchError(HandleErrorService.handleError)
    );
  }

  getUserLevel(id?: number): Observable<IRank> {
    if (!id) {
      id = environment.currentUser;
    }
    return this.http.get<IRank>(`${this.url}/user/${id}/level`).pipe(
      catchError(HandleErrorService.handleError)
    );
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.url}/user`, user).pipe(
      catchError(HandleErrorService.handleError)
    );
  }

  updateUser(user: IUser): Observable<void> {
    return this.http.patch<void>(`${this.url}/user`, user).pipe(
      catchError(HandleErrorService.handleError)
    );
  }

  deleteUserById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/user/${id}`).pipe(
      catchError(HandleErrorService.handleError)
    );
  }
}
