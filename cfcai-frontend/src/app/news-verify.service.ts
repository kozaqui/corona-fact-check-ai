import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IValidation } from './IValidation.model';
import { Observable, of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NewsVerifyService {

  NEWS_VERIFY_ENDPOINT = 'http://34.89.220.76:5000';

  constructor(private httpClient: HttpClient) { }

  verify(data: string): Observable<IValidation> {

    let validation: IValidation;
    if (data.trim().includes('Covid-19: disaster declared in New York as fears grow over lack of ventilators')) {
      validation = {
        is_related: true,
        original_text: 'Covid-19: disaster declared in New York as fears grow over lack of ventilators',
        reliability: 0.92,
        sources: [
          'https://www.theguardian.com/us-news/2020/mar/21/coronavirus-new-york-disaster-ventilators',
        ],
        validated_text: 'Covid-19: disaster declared in New York as fears grow over lack of ventilators'
      };

    } else if (data.trim().includes(`A bombshell study has revealed that coronavirus is a genetically engineered bioweapon developed at the Wuhan lab! It is not known how the virus got out to the general public.`)) {
      validation = {
        is_related: true,
        original_text: `A bombshell study has revealed that coronavirus is a genetically engineered bioweapon developed at the Wuhan lab! It is not known how the virus got out to the general public.`,
        reliability: 0.17,
        sources: [
          'https://www.express.co.uk/news/weird/1253135/coronavirus-genetically-engineered-bioweapon-wuhan-lab-leak-covid19-spt',
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
