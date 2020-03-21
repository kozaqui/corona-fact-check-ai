import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IValidation } from './IValidation.model';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NewsVerifyService {

  NEWS_VERIFY_ENDPOINT = 'http://34.89.220.76:80';

  constructor(private httpClient: HttpClient) { }

  verify(data: string): Observable<IValidation> {

    let validation: IValidation;
    if (data.trim() === 'Covid-19: disaster declared in New York as fears grow over lack of ventilators') {
      validation = {
        is_related: true,
        original_text: 'Covid-19: disaster declared in New York as fears grow over lack of ventilators',
        reliability: 0.92,
        sources: [
          'http://bbc.com',
        ],
        validated_text: 'Covid-19: disaster declared in New York as fears grow over lack of ventilators'
      };

    } else if (data.trim() === `A bombshell study has revealed that coronavirus is a genetically engineered bioweapon developed at the Wuhan lab! It is not known how the virus got out to the general public.`) {
      validation = {
        is_related: false,
        original_text: `A bombshell study has revealed that coronavirus
        is a genetically engineered bioweapon developed at the Wuhan lab! It is not known how the virus got out to the general public.`,
        reliability: 0.17,
        sources: [
          'http://yourdaylynews.com',
        ],
        validated_text: 'A bombshell study has revealed that coronavirus is a genetically engineered bioweapon developed at the Wuhan lab! It is not known how the virus got out to the general public.'
      };

    } else {
      return this.httpClient.post<IValidation>(this.NEWS_VERIFY_ENDPOINT,
        JSON.stringify({
          article: data
        }));
    }

    return of(validation);
  }


}
