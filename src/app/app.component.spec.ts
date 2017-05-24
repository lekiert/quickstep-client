/* tslint:disable:no-unused-variable */

import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import {Http, HttpModule} from "@angular/http";
import {AuthConfig, AuthHttp, provideAuth} from 'angular2-jwt';
import { environment } from '../environments/environment';
import { AuthGuard } from './common/auth.guard';
import { UserService } from './services/user/user.service';
import {Observable} from "rxjs/Observable";
import {User} from "./user";
import {Subject} from "rxjs/Subject";
import {By} from "@angular/platform-browser";
import {AuthService} from "./services/auth/auth.service";

class AuthGuardMock {
  isUser() {
    return true;
  }
}

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

class UserServiceMock {
    getUserAsObservableU() {
    return true;
  }

  getUserObservable(): Observable<User> {
    let user = new User(1, {
        first_name: 'Jan',
        last_name: 'Kowalski',
        role: 'STUDENT'
    });
    let sub = new Subject<User>();
    sub.next(user);

    return sub.asObservable();
  }

  getUser() {
    return new Promise((resolve) => resolve(
        new User(1, {
          first_name: 'Jan',
          last_name: 'Kowalski',
          role: 'STUDENT'
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
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: AuthGuard, useClass: AuthGuardMock },
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

    component.user = new User(1, {
      'first-name': 'Jan',
      'last-name': 'Kowalski',
      'role': 'STUDENT'
    });
    fixture.detectChanges()
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should display top container', async(() => {
      let top = fixture.debugElement.query(By.css('.main-header'));
      expect(top).toBeTruthy();
  }));

  it('should display the navigation', async(() => {
      let nav = fixture.debugElement.query(By.css('.sidebar nav'));
      expect(nav).toBeTruthy();
  }));

  it('should display the supervisor navigation if the user is a supervisor', async(() => {
      component.user = new User(1, {
        first_name: 'Jan',
        last_name: 'Kowalski',
        role: 'SUPERVISOR'
      })
      fixture.detectChanges();

      let nav = fixture.debugElement.queryAll(By.css('.sidebar nav .nav__menu-item__link'));

      expect(nav[0].nativeNode.innerHTML).toContain('Podsumowanie');
      expect(nav[1].nativeNode.innerHTML).toContain('Nauczyciele');
      expect(nav[2].nativeNode.innerHTML).toContain('Uczniowie');
      expect(nav[3].nativeNode.innerHTML).toContain('Grupy');
      expect(nav[4].nativeNode.innerHTML).toContain('Dane konta');
  }));

  it('should display the student navigation if the user is a student', async(() => {
      component.user = new User(1, {
        first_name: 'Jan',
        last_name: 'Kowalski',
        role: 'STUDENT'
      })
      fixture.detectChanges();

      let nav = fixture.debugElement.queryAll(By.css('.sidebar nav .nav__menu-item__link'));

      expect(nav[0].nativeNode.innerHTML).toContain('Podsumowanie');
      expect(nav[1].nativeNode.innerHTML).toContain('Kursy');
      expect(nav[2].nativeNode.innerHTML).toContain('Dane konta');
  }));

  it('should display the teacher navigation if the user is a teacher', async(() => {
      component.user = new User(1, {
        first_name: 'Jan',
        last_name: 'Kowalski',
        role: 'TEACHER'
      })
      fixture.detectChanges();

      let nav = fixture.debugElement.queryAll(By.css('.sidebar nav .nav__menu-item__link'));

      expect(nav[0].nativeNode.innerHTML).toContain('Najnowsze wyniki');
      expect(nav[1].nativeNode.innerHTML).toContain('Kursy');
      expect(nav[2].nativeNode.innerHTML).toContain('Grupy');
      expect(nav[3].nativeNode.innerHTML).toContain('Dane konta');
  }));

  it('should display the admin navigation if the user is an admin', async(() => {
      component.user = new User(1, {
        first_name: 'Jan',
        last_name: 'Kowalski',
        role: 'TEACHER'
      })
      fixture.detectChanges();

      let nav = fixture.debugElement.queryAll(By.css('.sidebar nav .nav__menu-item__link'));

      expect(nav[0].nativeNode.innerHTML).toContain('Najnowsze wyniki');
      expect(nav[1].nativeNode.innerHTML).toContain('Kursy');
      expect(nav[2].nativeNode.innerHTML).toContain('Grupy');
      expect(nav[3].nativeNode.innerHTML).toContain('Dane konta');
  }));
});
