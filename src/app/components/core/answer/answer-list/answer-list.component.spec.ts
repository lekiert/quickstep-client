/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AnswerListComponent} from "./answer-list.component";
import {UserService} from "app/services/user.service";
import {TestService} from "app/services/test.service";
import {AuthConfig, AuthHttp, provideAuth} from "angular2-jwt";
import {Http, HttpModule} from "@angular/http";
import {Subject} from "rxjs/Subject";
import {User} from "app/user";
import {Observable} from "rxjs/Observable";
import {AnswerService} from "../../../../services/answer.service";
import {Answer} from "../../../../answer";

describe('AnswerListComponent', () => {
  let component: AnswerListComponent;
  let fixture: ComponentFixture<AnswerListComponent>;

  class AnswerServiceMock {
    getUserAnswers() {
      let answers = [
          new Answer(1, {}),
          new Answer(2, {}),
      ];

      return new Promise(r => r(answers));
    }
  }
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

  class TestServiceMock {
    getUserAnswers() {
      return new Promise((resolve) => resolve(
          {"data":[{"id":"1231","type":"answers","links":{"self":"http://myenglish.edu.pl:3000/answers/1231"},"attributes":{"answers":{"236":{"1":["544"]},"237":{"1":["548"]},"238":{"1":["552"]},"239":{"1":["555"]},"240":{"1":["557"]},"241":{"1":["561"]},"242":{"1":["563"]}},"created-at":"09:54, 08.03.2017 ","results":{"236":{"1":{"544":false,"545":false}},"237":{"1":{"547":true,"548":true}},"238":{"1":{"552":false,"551":false}},"239":{"1":{"554":false,"555":false}},"240":{"1":{"557":false,"558":false}},"241":{"1":{"560":false,"561":false}},"242":{"1":{"563":true,"564":true}}},"score":{"max":14,"score":4},"test-id":48,"test-name":"Liczebniki 1-10"},"relationships":{"user":{"links":{"self":"http://myenglish.edu.pl:3000/answers/1231/relationships/user","related":"http://myenglish.edu.pl:3000/answers/1231/user"}},"test":{"links":{"self":"http://myenglish.edu.pl:3000/answers/1231/relationships/test","related":"http://myenglish.edu.pl:3000/answers/1231/test"}}}},{"id":"1230","type":"answers","links":{"self":"http://myenglish.edu.pl:3000/answers/1230"},"attributes":{"answers":{"236":{"1":["544"]},"237":{"1":["548"]},"238":{"1":["552"]},"239":{"1":["554"]},"240":{"1":["557"]},"241":{"1":["560"]},"242":{"1":["563"]}},"created-at":"09:17, 08.03.2017 ","results":{"236":{"1":{"544":false,"545":false}},"237":{"1":{"547":true,"548":true}},"238":{"1":{"552":false,"551":false}},"239":{"1":{"554":true,"555":true}},"240":{"1":{"557":false,"558":false}},"241":{"1":{"560":true,"561":true}},"242":{"1":{"563":true,"564":true}}},"score":{"max":14,"score":8},"test-id":48,"test-name":"Liczebniki 1-10"},"relationships":{"user":{"links":{"self":"http://myenglish.edu.pl:3000/answers/1230/relationships/user","related":"http://myenglish.edu.pl:3000/answers/1230/user"}},"test":{"links":{"self":"http://myenglish.edu.pl:3000/answers/1230/relationships/test","related":"http://myenglish.edu.pl:3000/answers/1230/test"}}}},{"id":"1229","type":"answers","links":{"self":"http://myenglish.edu.pl:3000/answers/1229"},"attributes":{"answers":{"236":{"1":["544"]},"237":{"1":["548"]},"238":{"1":["551"]},"239":{"1":["555"]},"240":{"1":["557"]},"241":{"1":["561"]},"242":{"1":["563"]}},"created-at":"08:58, 08.03.2017 ","results":{"236":{"1":{"544":false,"545":false}},"237":{"1":{"547":true,"548":true}},"238":{"1":{"552":true,"551":true}},"239":{"1":{"554":false,"555":false}},"240":{"1":{"557":false,"558":false}},"241":{"1":{"560":false,"561":false}},"242":{"1":{"563":true,"564":true}}},"score":{"max":14,"score":6},"test-id":48,"test-name":"Liczebniki 1-10"},"relationships":{"user":{"links":{"self":"http://myenglish.edu.pl:3000/answers/1229/relationships/user","related":"http://myenglish.edu.pl:3000/answers/1229/user"}},"test":{"links":{"self":"http://myenglish.edu.pl:3000/answers/1229/relationships/test","related":"http://myenglish.edu.pl:3000/answers/1229/test"}}}},{"id":"162","type":"answers","links":{"self":"http://myenglish.edu.pl:3000/answers/162"},"attributes":{"answers":{"236":{"1":["545"]},"237":{"1":["548"]},"238":{"1":["552"]},"239":{"1":["555"]},"240":{"1":["558"]},"241":{"1":["560"]},"242":{"1":["563"]}},"created-at":"15:29, 02.02.2017 ","results":{"236":{"1":{"544":true,"545":true}},"237":{"1":{"547":true,"548":true}},"238":{"1":{"552":false,"551":false}},"239":{"1":{"554":false,"555":false}},"240":{"1":{"557":true,"558":true}},"241":{"1":{"560":true,"561":true}},"242":{"1":{"563":true,"564":true}}},"score":{"max":14,"score":10},"test-id":48,"test-name":"Liczebniki 1-10"},"relationships":{"user":{"links":{"self":"http://myenglish.edu.pl:3000/answers/162/relationships/user","related":"http://myenglish.edu.pl:3000/answers/162/user"}},"test":{"links":{"self":"http://myenglish.edu.pl:3000/answers/162/relationships/test","related":"http://myenglish.edu.pl:3000/answers/162/test"}}}}],"links":{"first":"http://myenglish.edu.pl:3000/users/3/answers?page%5Bnumber%5D=1\u0026page%5Bsize%5D=10\u0026sort=-id","last":"http://myenglish.edu.pl:3000/users/3/answers?page%5Bnumber%5D=1\u0026page%5Bsize%5D=10\u0026sort=-id"}}
      ))
    }
  }

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
