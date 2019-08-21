import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { IUser } from './model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

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

  getUserList(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.url}/user`).pipe(
      catchError(UserService.handleError)
    );
  }

  getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}/user/${id}`).pipe(
      catchError(UserService.handleError)
    );
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.url}/user`, user).pipe(
      catchError(UserService.handleError)
    );
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.url}/user`, user).pipe(
      catchError(UserService.handleError)
    );
  }

  deleteUserById(id: number): Observable<IUser> {
    return this.http.delete<IUser>(`${this.url}/user/${id}`).pipe(
      catchError(UserService.handleError)
    );
  }
}
