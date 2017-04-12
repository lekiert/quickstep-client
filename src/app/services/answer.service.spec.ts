import { TestBed, inject } from '@angular/core/testing';
import { AnswerService } from './answer.service';
import { BaseService } from './base.service';
import {AuthConfig, AuthHttp, provideAuth} from 'angular2-jwt';
import { environment } from 'environments/environment';
import {Http, HttpModule} from "@angular/http";

describe('AnswerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [ AnswerService, BaseService, {
        provide: AuthHttp,
        useFactory: (http) => {
          return new AuthHttp(new AuthConfig(), http);
        },
        deps: [Http]
      } ]
    });
  });

  it('should be created', inject([ AnswerService ], (service: AnswerService) => {
    expect(service).toBeTruthy();
  }));
});
