/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AnswerListComponent} from "./answer-list.component";
import {UserService} from "app/services/user/user.service";
import {TestService} from "app/services/test/test.service";
import {AuthConfig, AuthHttp, provideAuth} from "angular2-jwt";
import {Http, HttpModule} from "@angular/http";
import {Subject} from "rxjs/Subject";
import {User} from "app/user";
import {Observable} from "rxjs/Observable";
import {AnswerService} from "../../../../services/answer/answer.service";
import {Answer} from "../../../../answer";
import {AnswerServiceMock} from "../../../../services/testing/answer.service.mock";
import {UserServiceMock} from "../../../../services/testing/user.service.mock";
import {TestServiceMock} from "../../../../services/testing/test.service.mock";

describe('AnswerListComponent', () => {
  let component: AnswerListComponent;
  let fixture: ComponentFixture<AnswerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpModule ],
      declarations: [ AnswerListComponent ],
      providers: [
        {provide: AnswerService, useClass: AnswerServiceMock},
        {provide: UserService, useClass: UserServiceMock},
        {provide: TestService, useClass: TestServiceMock},
        {
          provide: AuthHttp,
          useFactory: (http) => {
            return new AuthHttp(new AuthConfig(), http);
          },
          deps: [Http]
        }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
