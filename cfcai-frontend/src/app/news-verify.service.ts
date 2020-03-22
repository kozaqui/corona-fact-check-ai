import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IValidation } from './IValidation.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NewsVerifyService {

  NEWS_VERIFY_ENDPOINT = 'http://34.89.220.76:5000';

  constructor(private httpClient: HttpClient) { }

  verify(data: string): Observable<IValidation> {

    return this.httpClient.post<IValidation>(this.NEWS_VERIFY_ENDPOINT,
      JSON.stringify({
        text: data
      }));
  }

}
