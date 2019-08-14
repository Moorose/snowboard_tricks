import { Trick } from '../models/trick';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrickService {
  url = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getTrickList(): Observable<Trick[]> {
    return this.http.get<Trick[]>(`${this.url}/tricks`);
  }

  getTrickById(id: number): Observable<Trick> {
    return this.http.get<Trick>(`${this.url}/tricks/${id}`);
  }

  addTrick(trick: Trick): Observable<Trick> {
    return this.http.post<Trick>(`${this.url}/tricks`, trick, this.httpOptions);
  }

  updateTrick(trick: Trick): Observable<Trick> {
    return this.http.put<Trick>(`${this.url}/tricks`, trick, this.httpOptions);
  }

}