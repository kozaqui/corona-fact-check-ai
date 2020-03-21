import { TestBed } from '@angular/core/testing';

import { NewsVerifyService } from './news-verify.service';

describe('NewsVerifyService', () => {
  let service: NewsVerifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsVerifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
