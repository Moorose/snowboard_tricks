import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TriksService {

  url:string = 'localhost3000';

  constructor(private http: HttpClient) {}

  getTrickList() {
    return this.http.get(`${this.url}/tricks`);
    // return this.http.get('assets/tricks.json');
  }
}
