import { TestBed, inject } from '@angular/core/testing';

import { SettingsService } from './settings.service';
import {Subject} from "rxjs/Subject";
import {User} from "../../../../user";
import {AuthService} from "../../../../services/auth/auth.service";

class AuthServiceMock {
  getUserAsObservable() {
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

describe('SettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          SettingsService,
      ]
    });
  });

  it('should ...', inject([SettingsService], (service: SettingsService) => {
    expect(service).toBeTruthy();
  }));
});
