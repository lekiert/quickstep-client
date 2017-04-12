/* tslint:disable:no-unused-variable */

import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import {Http, HttpModule} from "@angular/http";
import {AuthConfig, AuthHttp, provideAuth} from 'angular2-jwt';
import { environment } from '../environments/environment';
import { AuthGuard } from './common/auth.guard';
import { UserService } from './services/user.service';
import {Observable} from "rxjs/Observable";
import {User} from "./user";
import {Subject} from "rxjs/Subject";

class UserServiceMock {
  fetchUserFromAPI() {
    return true;
  }

  getAuthenticatedUser(): Observable<User> {
    let user = new User(1, {
      attributes: {
        first_name: 'Jan',
        last_name: 'Kowalski'
      }
    });
    let sub = new Subject<User>();
    sub.next(user);

    return sub.asObservable();
  }

  getUser() {
    return new Promise((resolve) => resolve(
        new User(1, {
          attributes: {
            first_name: 'Jan',
            last_name: 'Kowalski'
          }
        })
    ))
  }
}

describe('App: QuickstepClient', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpModule ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: UserService, useClass: UserServiceMock },
        AuthGuard,
        {
          provide: AuthHttp,
          useFactory: (http) => {
            return new AuthHttp(new AuthConfig(), http);
          },
          deps: [Http]
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));
});
