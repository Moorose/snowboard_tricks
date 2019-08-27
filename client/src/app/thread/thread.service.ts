import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { HandleErrorService } from '../handle-error.service';
import { IThread } from "./models/thread";
import { IMessage } from "./models/message";
import { IInvite } from "./models/invite";


@Injectable({
  providedIn: 'root',
})
export class ThreadService {
  url: string = environment.apiUrl;

  constructor(private http: HttpClient,
              private handleErrorService: HandleErrorService) {
  }

  getThreadInvite(): Observable<IInvite[]> {
    const userId = environment.currentUser;
    return this.http.get<IInvite[]>(`${this.url}/user/${userId}/invite`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  getThreadByUserId(): Observable<IThread[]> {
    const userId = environment.currentUser;
    return this.http.get<IThread[]>(`${this.url}/user/${userId}/thread`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  getThreadById(threadId: number): Observable<IThread> {
    return this.http.get<IThread>(`${this.url}/user/thread/${threadId}`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  getMessages(threadId: number): Observable<IMessage[]> {
    return this.http.get<IMessage[]>(`${this.url}/user/thread/${threadId}/message`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  openThread(userTrickId: number): Observable<IThread> {
    const userId = environment.currentUser;
    return this.http.post<IThread>(`${this.url}/user/${userId}/thread/${userTrickId}/open`, {}).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  addMessage(threadId: number, body: string): Observable<void> {
    const userId = environment.currentUser;
    return this.http.post<void>(`${this.url}/user/${userId}/thread/${threadId}/message`, body).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  acceptInvite(inviteId: number): Observable<void> {
    const userId = environment.currentUser;
    return this.http.patch<void>(`${this.url}/user/${userId}/invite/${inviteId}`, {}).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  leaveThread(threadId: number): Observable<void> {
    const userId = environment.currentUser;
    return this.http.delete<void>(`${this.url}/user/${userId}/thread/${threadId}/leave`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  closeThread(threadId: number): Observable<void> {
    const userId = environment.currentUser;
    return this.http.delete<void>(`${this.url}/user/${userId}/thread/${threadId}/close`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
