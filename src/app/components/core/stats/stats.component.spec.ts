/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsComponent } from './stats.component';
import { SettingsComponent } from '../settings/settings.component';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { InformationService } from "app/services/information.service";
import { AnswerService } from "app/services/answer.service";
import { provideAuth } from "angular2-jwt";
import { environment } from "environments/environment";
import { HttpModule } from "@angular/http";
import { UserService } from "app/services/user.service";
import { ChartsModule } from "ng2-charts";
import {By} from "@angular/platform-browser";
import {Answer} from "../../../answer";
import {UserAction} from "../../../user-action";

class UserServiceMock {
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
    return new Promise<UserAction[]>((resolve, reject) => {
      resolve(statsList);
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
        "next": "http:\/\/localhost:3000\/answers?page%5Bnumber%5D=2&page%5Bsize%5D=15&sort=id",
        "last": "http:\/\/localhost:3000\/answers?page%5Bnumber%5D=121&page%5Bsize%5D=15&sort=id"
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

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule, HttpModule, ChartsModule ],
      declarations: [ StatsComponent ],
      providers: [ InformationService, UserService, AnswerService, provideAuth({
          tokenName: environment.TOKEN_NAME,
          tokenGetter: () => localStorage.getItem(environment.TOKEN_NAME)
      }) ]
    })
    .overrideComponent(StatsComponent, {
      set: {
        providers: [
          {provide: AnswerService, useClass: AnswerServiceMock},
          {provide: UserService, useClass: UserServiceMock}
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a pagination', () => {
    let pagination = fixture.debugElement.query(By.css('.dashboard .pagination'));
    expect(pagination).toBeTruthy();
  })

  it('should display a chart', () => {
    let pagination = fixture.debugElement.query(By.css('.dashboard .dashboard__chart'));
    expect(pagination).toBeTruthy();
  })
  //
  // it('should not display a pagination', () => {
  //   component.stats = null;
  //   fixture.detectChanges();
  //   let pagination = fixture.debugElement.query(By.css('.dashboard .pagination'));
  //   expect(pagination).toBeFalsy();
  // })
});
