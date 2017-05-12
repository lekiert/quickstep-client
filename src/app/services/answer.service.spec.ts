import { TestBed, inject } from '@angular/core/testing';
import { AnswerService } from './answer.service';
import { BaseService } from './base.service';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { Http, HttpModule } from "@angular/http";
import {Subject} from "rxjs/Subject";
import {User} from "../user";
import {AuthService} from "./auth.service";

class AuthServiceMock {
  fetchUserFromAPI() {
    let user = new User(1, {
      first_name: 'Jan',
      last_name: 'Kowalski',
      role: 'STUDENT'
    });
    let sub = new Subject<User>();
    sub.next(user);

    return sub.asObservable();
  }
}


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
