/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { UserService } from 'app/services/user.service';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import {Http, HttpModule} from "@angular/http";
import {AuthConfig, AuthHttp, provideAuth} from "angular2-jwt";
import { environment } from "environments/environment";
import {User} from "../../../user";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

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

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule, HttpModule ],
      declarations: [ SettingsComponent ],
      providers: [
        {provide: UserService, useClass: UserServiceMock},
        {
          provide: AuthHttp,
          useFactory: (http) => {
            return new AuthHttp(new AuthConfig(), http);
          },
          deps: [Http]
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
