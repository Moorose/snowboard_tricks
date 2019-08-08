import { Injectable } from '@angular/core';
import { Trick } from '../models/Trick';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TriksService {

  constructor(private http: HttpClient) {}

  getTrickList() {
    return this.http.get('assets/tricks.json');
  }
}
