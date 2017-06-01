/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from "@angular/forms";
import { AnswerComponent } from './answer.component';
import { StudentBracketsComponent } from '../exercise/student-exercises/brackets/student-brackets.component';
import { StudentChoiceComponent } from '../exercise/student-exercises/choice/student-choice.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'app/services/user/user.service';
import { TestService } from 'app/services/test/test.service';
import {AuthConfig, AuthHttp } from 'angular2-jwt';
import {Http, HttpModule} from "@angular/http";
import {AnswerService} from "../../../services/answer/answer.service";
import {UserServiceMock} from "../../../services/testing/user.service.mock";
import {AnswerServiceMock} from "../../../services/testing/answer.service.mock";
import {TestServiceMock} from "../../../services/testing/test.service.mock";
import {UtilModule} from "../../util/util.module";

describe('AnswerComponent', () => {
  let component: AnswerComponent;
  let fixture: ComponentFixture<AnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule, HttpModule, UtilModule ],
      declarations: [ AnswerComponent, StudentBracketsComponent, StudentChoiceComponent ],
      providers: [
        {provide: UserService, useClass: UserServiceMock},
        {provide: TestService, useClass: TestServiceMock},
        {provide: AnswerService, useClass: AnswerServiceMock},
        {
          provide: AuthHttp,
          useFactory: (http) => {
            return new AuthHttp(new AuthConfig(), http);
          },
          deps: [Http]
        } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
