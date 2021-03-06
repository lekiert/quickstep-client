/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsComponent } from './stats.component';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { InformationService } from "app/services/information/information.service";
import { AnswerService } from "app/services/answer/answer.service";
import {AuthConfig, AuthHttp } from "angular2-jwt";
import {Http, HttpModule} from "@angular/http";
import { UserService } from "app/services/user/user.service";
import { ChartsModule } from "ng2-charts";
import {By} from "@angular/platform-browser";
import {Answer} from "app/answer";
import {UserAction} from "app/user-action";
import {UserActionCollection} from "app/user-action-collection";
import {User} from "app/user";
import {Subject} from "rxjs/Subject";
import {AuthService} from "../../../../services/auth/auth.service";
import {UserActionListComponent} from "./user-action-list/user-action-list.component";
import {UtilModule} from "../../../util/util.module";

class InformationServiceMock {
  getLatestUserActionLogs() {
    let testStats = {
      "data": [
        {
          "id": "2885",
          "type": "user-logs",
          "links": {
            "self": "http:\/\/localhost:3000\/user-logs\/2885"
          },
          "attributes": {
            "user-id": 202,
            "user-name": "Test User",
            "action-code": "USER_HAS_LOGGED_IN",
            "additional-data": {

            },
            "created-at": "15:58, 12.04.2017 "
          },
          "relationships": {
            "user": {
              "links": {
                "self": "http:\/\/localhost:3000\/user-logs\/2885\/relationships\/user",
                "related": "http:\/\/localhost:3000\/user-logs\/2885\/user"
              }
            }
          }
        },
        {
          "id": "2884",
          "type": "user-logs",
          "links": {
            "self": "http:\/\/localhost:3000\/user-logs\/2884"
          },
          "attributes": {
            "user-id": 3,
            "user-name": "John Adams",
            "action-code": "USER_HAS_LOGGED_IN",
            "additional-data": {

            },
            "created-at": "23:29, 23.03.2017 "
          },
          "relationships": {
            "user": {
              "links": {
                "self": "http:\/\/localhost:3000\/user-logs\/2884\/relationships\/user",
                "related": "http:\/\/localhost:3000\/user-logs\/2884\/user"
              }
            }
          }
        }
      ],
      "links": {
        "first": "http:\/\/localhost:3000\/user-logs?page%5Bnumber%5D=1&page%5Bsize%5D=15&sort=-id",
        "next": "http:\/\/localhost:3000\/user-logs?page%5Bnumber%5D=2&page%5Bsize%5D=15&sort=-id",
        "last": "http:\/\/localhost:3000\/user-logs?page%5Bnumber%5D=168&page%5Bsize%5D=15&sort=-id"
      }
    };
    let statsList = testStats.data.map((answer) => {
      return new UserAction(+answer.id, answer.attributes);
    })

    let batch = new UserActionCollection;
    batch.actions = statsList;
    batch.meta = {
      links: {}
    }

    return new Promise<UserActionCollection>((resolve, reject) => {
      resolve(batch);
    });
  }
}

class AnswerServiceMock {
  getAnswerStats() {
    let testAnswers = {
      "data": [
        {
          "id": "162",
          "type": "answers",
          "links": {
            "self": "http:\/\/localhost:3000\/answers\/162"
          },
          "attributes": {
            "answers": {},
            "created-at": "15:29, 02.02.2017 ",
            "results": {},
            "score": {
              "max": 14,
              "score": 10
            },
            "test-id": 48,
            "test-name": "Liczebniki 1-10"
          },
          "relationships": {
            "user": {
              "links": {
                "self": "http:\/\/localhost:3000\/answers\/162\/relationships\/user",
                "related": "http:\/\/localhost:3000\/answers\/162\/user"
              }
            },
            "test": {
              "links": {
                "self": "http:\/\/localhost:3000\/answers\/162\/relationships\/test",
                "related": "http:\/\/localhost:3000\/answers\/162\/test"
              }
            }
          }
        },
        {
          "id": "163",
          "type": "answers",
          "links": {
            "self": "http:\/\/localhost:3000\/answers\/163"
          },
          "attributes": {
            "answers": {},
            "created-at": "19:39, 02.02.2017 ",
            "results": {},
            "score": {
              "max": 18,
              "score": 18
            },
            "test-id": 67,
            "test-name": "Test 1: Szko\u0142a"
          },
          "relationships": {
            "user": {
              "links": {
                "self": "http:\/\/localhost:3000\/answers\/163\/relationships\/user",
                "related": "http:\/\/localhost:3000\/answers\/163\/user"
              }
            },
            "test": {
              "links": {
                "self": "http:\/\/localhost:3000\/answers\/163\/relationships\/test",
                "related": "http:\/\/localhost:3000\/answers\/163\/test"
              }
            }
          }
        }
      ],
      "links": {
        "first": "http:\/\/localhost:3000\/answers?page%5Bnumber%5D=1&page%5Bsize%5D=15&sort=id",
        "next": "http:\/\/localhost:3000\/answers?page%5Bnumber%5D=1&page%5Bsize%5D=15&sort=id",
        "last": "http:\/\/localhost:3000\/answers?page%5Bnumber%5D=2&page%5Bsize%5D=15&sort=id"
      }
    };
    let answerList = testAnswers.data.map((answer) => {
      return new Answer(+answer.id, answer.attributes);
    })
    return new Promise<Answer[]>((resolve, reject) => {
      resolve(answerList);
    });
  }
}

class UserServiceMock {
  getAuthenticatedUserObject() {
    let user = new User(1, {
      'role': 'SUPERVISOR'
    })

    return new Promise((resolve) => resolve(user));
  }
}

class AuthServiceMock {
  getUserAsObservable() {
    let user = new User(1, {
      first_name: 'Jan',
      last_name: 'Kowalski',
      role: 'ADMIN'
    });
    let sub = new Subject<User>();
    sub.next(user);

    return sub.asObservable();
  }

  public getAuthenticatedUser(): Promise<User> {
    let user = new User(1, {
      first_name: 'Jan',
      last_name: 'Kowalski',
      role: 'ADMIN'
    });

    return new Promise(r => r(user))
  }
}

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule, HttpModule, ChartsModule, UtilModule ],
      declarations: [ StatsComponent, UserActionListComponent ],
      providers: [
          {provide: InformationService, useClass: InformationServiceMock},
          {provide: AnswerService, useClass: AnswerServiceMock},
          {provide: AuthService, useClass: AuthServiceMock},
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

    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a pagination', () => {
    component.pagination = {
      first: 1,
      last: 2,
      prev: null,
      next: null
    }
    fixture.detectChanges();
    let pagination = fixture.debugElement.query(By.css('.dashboard .pagination'));
    expect(pagination).toBeTruthy();
  })

  it('should display a chart', () => {
    let pagination = fixture.debugElement.query(By.css('.dashboard .dashboard__chart'));
    expect(pagination).toBeTruthy();
  })

  it('should display user groups button for supervisors and admins (async)', async(() => {
    component.student = new User(1, {});
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let button = fixture.debugElement.query(By.css('.dashboard .view-user-groups'));
      expect(button).toBeTruthy();
    });
  }))
});
