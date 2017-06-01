import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {AuthConfig, AuthHttp} from "angular2-jwt";
import {Http, HttpModule} from "@angular/http";
import {UserService} from "../user/user.service";
import {User} from "../../user";
import {RouterTestingModule} from "@angular/router/testing";

class UserServiceMock {
  getUserAsObservable() {
    return true;
  }

  getAuthenticatedUserObject(): Promise<User> {
    let user = new User(1, {
      attributes: {
        first_name: 'Jan',
        last_name: 'Kowalski'
      }
    });
    // let sub = new Subject<User>();
    // sub.next(user);

    return new Promise(resolve => user);
  }
}

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      providers: [
          {provide: UserService, useClass: UserServiceMock},
          AuthService,
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

  it('should create an instance', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
