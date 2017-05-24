import { TestBed, inject } from '@angular/core/testing';
import { AnswerService } from './answer.service';
import { BaseService } from '../base.service';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { Http, HttpModule } from "@angular/http";
import {AuthService} from "../auth/auth.service";
import {AuthServiceMock} from "../testing/auth.service.mock";

describe('AnswerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        AnswerService,
        BaseService,
        {provide: AuthService, useClass: AuthServiceMock},
        {
          provide: AuthHttp,
          useFactory: (http) => {
            return new AuthHttp(new AuthConfig(), http);
          },
          deps: [Http]
        }
      ]
    });
  });

  it('should be created', inject([ AnswerService ], (service: AnswerService) => {
    expect(service).toBeTruthy();
  }));
});
