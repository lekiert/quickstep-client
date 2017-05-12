import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {AuthConfig, AuthHttp} from "angular2-jwt";
import {Http, HttpModule} from "@angular/http";
import {UserService} from "./user.service";
import {User} from "../user";

class UserServiceMock {
  fetchUserFromAPI() {
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
      imports: [ HttpModule ],
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

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
