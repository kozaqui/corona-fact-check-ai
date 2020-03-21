import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IValidation } from './IValidation.model';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NewsVerifyService {

  NEWS_VERIFY_ENDPOINT = 'http://api.news-verify.wtheory.io/';

  constructor(private httpClient: HttpClient) { }

  verify(data: string): Observable<IValidation> {
    // return this.httpClient.post<IValidation>(this.NEWS_VERIFY_ENDPOINT,
    //   JSON.stringify({
    //     article: data
    //   }));
    const validation: IValidation = {
      is_related: true,
      original_text: 'Mr. Zięba Lies',
      reliability: 0.7,
      sources: [
        'http://onet.pl',
        'http://wp.pl',
        'http://tvpinfo.pl',
      ],
       validated_text: ''
    };
    return of(validation);
  }


}
