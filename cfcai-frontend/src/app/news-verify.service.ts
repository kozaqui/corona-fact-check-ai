import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NewsVerifyService {

  NEWS_VERIFY_ENDPOINT = 'http://api.news-verify.wtheory.io/';

  constructor(private httpClient: HttpClient) { }

  verify(data: string) {
    return this.httpClient.post(this.NEWS_VERIFY_ENDPOINT,
      JSON.stringify({
        article: data
      }));
  }


}
