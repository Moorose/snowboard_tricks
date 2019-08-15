import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trick } from './models/trick';

@Injectable({
  providedIn: 'root',
})
export class TrickService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTrickList(): Observable<Trick[]> {
    return this.http.get<Trick[]>(`${this.url}/tricks`);
  }
}
