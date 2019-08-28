import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { HandleErrorService } from '../handle-error.service';

import { IUrl } from './models/Url';

​
@Injectable({
  providedIn: 'root',
})
export class FileService {
  url: string = environment.apiUrl;

  constructor(private http: HttpClient,
              private handleErrorService: HandleErrorService) {
  }

  getSignedUrlForPut(fileName: string): Observable<IUrl> {
    return this.http.get<IUrl>(`${this.url}/aws/${fileName}/put/url`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  getSignedUrlForGet(fileName: string): Observable<IUrl> {
    return this.http.get<IUrl>(`${this.url}/aws/${fileName}/get/url`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
