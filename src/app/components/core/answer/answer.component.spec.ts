/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from "@angular/forms";
import { AnswerComponent } from './answer.component';
import { StudentBracketsComponent } from '../exercise/student-exercises/brackets/student-brackets.component';
import { StudentChoiceComponent } from '../exercise/student-exercises/choice/student-choice.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'app/services/user.service';
import { TestService } from 'app/services/test.service';
import {AuthConfig, AuthHttp } from 'angular2-jwt';
import {Http, HttpModule} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {User} from "../../../user";
import {Subject} from "rxjs/Subject";
import {Answer} from "../../../answer";
import {AnswerService} from "../../../services/answer.service";

class AnswerServiceMock {
  getUserAnswers() {
    let answers = [
      new Answer(1, {}),
      new Answer(2, {}),
    ];

    return new Promise(r => r(answers));
  }

  getAnswer() {
    let answer = new Answer(1, {
      attributes: {
        answers: {},
        score: {
          max: 1,
          score: 1
        }
      }
    });

    return new Promise(r => r(answer));
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
}

class TestServiceMock {
  getAnswer() {
    return new Promise((resolve) => resolve(
        {"data":{"id":"162","type":"answers","links":{"self":"http://myenglish.edu.pl:3000/answers/162"},"attributes":{"answers":{"236":{"1":["545"]},"237":{"1":["548"]},"238":{"1":["552"]},"239":{"1":["555"]},"240":{"1":["558"]},"241":{"1":["560"]},"242":{"1":["563"]}},"created-at":"15:29, 02.02.2017 ","results":{"236":{"1":{"544":true,"545":true}},"237":{"1":{"547":true,"548":true}},"238":{"1":{"552":false,"551":false}},"239":{"1":{"554":false,"555":false}},"240":{"1":{"557":true,"558":true}},"241":{"1":{"560":true,"561":true}},"242":{"1":{"563":true,"564":true}}},"score":{"max":14,"score":10},"test-id":48,"test-name":"Liczebniki 1-10"},"relationships":{"user":{"links":{"self":"http://myenglish.edu.pl:3000/answers/162/relationships/user","related":"http://myenglish.edu.pl:3000/answers/162/user"},"data":{"type":"users","id":"3"}},"test":{"links":{"self":"http://myenglish.edu.pl:3000/answers/162/relationships/test","related":"http://myenglish.edu.pl:3000/answers/162/test"},"data":{"type":"tests","id":"48"}}}},"included":[{"id":"3","type":"users","links":{"self":"http://myenglish.edu.pl:3000/users/3"},"attributes":{"first-name":"Ludwika","last-name":"Ekiert","role":"STUDENT","email":"ludwikaekiert@wp.pl","created-at":"16:51, 12.01.2017 ","password":null},"relationships":{"courses":{"links":{"self":"http://myenglish.edu.pl:3000/users/3/relationships/courses","related":"http://myenglish.edu.pl:3000/users/3/courses"}},"password-updates":{"links":{"self":"http://myenglish.edu.pl:3000/users/3/relationships/password-updates","related":"http://myenglish.edu.pl:3000/users/3/password-updates"}},"groups":{"links":{"self":"http://myenglish.edu.pl:3000/users/3/relationships/groups","related":"http://myenglish.edu.pl:3000/users/3/groups"}},"answers":{"links":{"self":"http://myenglish.edu.pl:3000/users/3/relationships/answers","related":"http://myenglish.edu.pl:3000/users/3/answers"}},"user-logs":{"links":{"self":"http://myenglish.edu.pl:3000/users/3/relationships/user-logs","related":"http://myenglish.edu.pl:3000/users/3/user-logs"}}}},{"id":"48","type":"tests","links":{"self":"http://myenglish.edu.pl:3000/tests/48"},"attributes":{"code":"L11","name":"Liczebniki 1-10","description":"poziom trudności: łatwy","last-score":{}},"relationships":{"courses":{"links":{"self":"http://myenglish.edu.pl:3000/tests/48/relationships/courses","related":"http://myenglish.edu.pl:3000/tests/48/courses"}},"exercises":{"links":{"self":"http://myenglish.edu.pl:3000/tests/48/relationships/exercises","related":"http://myenglish.edu.pl:3000/tests/48/exercises"}},"answers":{"links":{"self":"http://myenglish.edu.pl:3000/tests/48/relationships/answers","related":"http://myenglish.edu.pl:3000/tests/48/answers"}}}}]}
    ));
  }

  getTestRelatedExercises() {
    return new Promise((resolve) => resolve(
        {"data":[{"id":"236","type":"exercises","links":{"self":"http://myenglish.edu.pl:3000/exercises/236"},"attributes":{"code":"L111","name":"Ćwiczenie 1","command":"Posłuchaj i wybierz poprawną odpowiedź.","data":{"1":""},"status":1,"test-id":48,"exercise-type":"CHOICE","answers":{"1":[{"mime":"image/jpeg","text":"544","media":"/system/storage_files/items/000/000/544/original/data?1485717640","correct":false},{"mime":"image/jpeg","text":"545","media":"/system/storage_files/items/000/000/545/original/data?1485717972","correct":true}]},"attachments":[{"id":543,"url":"/system/storage_files/items/000/000/543/original/data?1485717625","type":"audio/mpeg"}]},"relationships":{"tests":{"links":{"self":"http://myenglish.edu.pl:3000/exercises/236/relationships/tests","related":"http://myenglish.edu.pl:3000/exercises/236/tests"}},"storage-files":{"links":{"self":"http://myenglish.edu.pl:3000/exercises/236/relationships/storage-files","related":"http://myenglish.edu.pl:3000/exercises/236/storage-files"}}}},{"id":"237","type":"exercises","links":{"self":"http://myenglish.edu.pl:3000/exercises/237"},"attributes":{"code":"L112","name":"Ćwiczenie 2","command":"Posłuchaj i wybierz poprawną odpowiedź.","data":{"1":""},"status":1,"test-id":48,"exercise-type":"CHOICE","answers":{"1":[{"mime":"image/jpeg","text":"547","media":"/system/storage_files/items/000/000/547/original/data?1485718154","correct":false},{"mime":"image/jpeg","text":"548","media":"/system/storage_files/items/000/000/548/original/data?1485718163","correct":true}]},"attachments":[{"id":546,"url":"/system/storage_files/items/000/000/546/original/data?1485718026","type":"audio/mpeg"}]},"relationships":{"tests":{"links":{"self":"http://myenglish.edu.pl:3000/exercises/237/relationships/tests","related":"http://myenglish.edu.pl:3000/exercises/237/tests"}},"storage-files":{"links":{"self":"http://myenglish.edu.pl:3000/exercises/237/relationships/storage-files","related":"http://myenglish.edu.pl:3000/exercises/237/storage-files"}}}},{"id":"238","type":"exercises","links":{"self":"http://myenglish.edu.pl:3000/exercises/238"},"attributes":{"code":"L113","name":"Ćwiczenie 3","command":"Posłuchaj i wybierz poprawną odpowiedź.","data":{"1":""},"status":1,"test-id":48,"exercise-type":"CHOICE","answers":{"1":[{"mime":"image/jpeg","text":"552","media":"/system/storage_files/items/000/000/552/original/data?1485718332","correct":false},{"mime":"image/jpeg","text":"551","media":"/system/storage_files/items/000/000/551/original/data?1485718322","correct":true}]},"attachments":[{"id":549,"url":"/system/storage_files/items/000/000/549/original/data?1485718218","type":"audio/mpeg"}]},"relationships":{"tests":{"links":{"self":"http://myenglish.edu.pl:3000/exercises/238/relationships/tests","related":"http://myenglish.edu.pl:3000/exercises/238/tests"}},"storage-files":{"links":{"self":"http://myenglish.edu.pl:3000/exercises/238/relationships/storage-files","related":"http://myenglish.edu.pl:3000/exercises/238/storage-files"}}}},{"id":"239","type":"exercises","links":{"self":"http://myenglish.edu.pl:3000/exercises/239"},"attributes":{"code":"L114","name":"Ćwiczenie 4","command":"Posłuchaj i wybierz poprawną odpowiedź.","data":{"1":""},"status":1,"test-id":48,"exercise-type":"CHOICE","answers":{"1":[{"mime":"image/jpeg","text":"554","media":"/system/storage_files/items/000/000/554/original/data?1485718626","correct":true},{"mime":"image/jpeg","text":"555","media":"/system/storage_files/items/000/000/555/original/data?1485718632","correct":false}]},"attachments":[{"id":553,"url":"/system/storage_files/items/000/000/553/original/data?1485718393","type":"audio/mpeg"}]},"relationships":{"tests":{"links":{"self":"http://myenglish.edu.pl:3000/exercises/239/relationships/tests","related":"http://myenglish.edu.pl:3000/exercises/239/tests"}},"storage-files":{"links":{"self":"http://myenglish.edu.pl:3000/exercises/239/relationships/storage-files","related":"http://myenglish.edu.pl:3000/exercises/239/storage-files"}}}},{"id":"240","type":"exercises","links":{"self":"http://myenglish.edu.pl:3000/exercises/240"},"attributes":{"code":"L115","name":"Ćwiczenie 5","command":"Posłuchaj i wybierz poprawną odpowiedź.","data":{"1":""},"status":1,"test-id":48,"exercise-type":"CHOICE","answers":{"1":[{"mime":"image/jpeg","text":"557","media":"/system/storage_files/items/000/000/557/original/data?1485718857","correct":false},{"mime":"image/jpeg","text":"558","media":"/system/storage_files/items/000/000/558/original/data?1485718862","correct":true}]},"attachments":[{"id":556,"url":"/system/storage_files/items/000/000/556/original/data?1485718838","type":"audio/mpeg"}]},"relationships":{"tests":{"links":{"self":"http://myenglish.edu.pl:3000/exercises/240/relationships/tests","related":"http://myenglish.edu.pl:3000/exercises/240/tests"}},"storage-files":{"links":{"self":"http://myenglish.edu.pl:3000/exercises/240/relationships/storage-files","related":"http://myenglish.edu.pl:3000/exercises/240/storage-files"}}}},{"id":"241","type":"exercises","links":{"self":"http://myenglish.edu.pl:3000/exercises/241"},"attributes":{"code":"L116","name":"Ćwiczenie 6","command":"Posłuchaj i wybierz poprawną odpowiedź.","data":{"1":""},"status":1,"test-id":48,"exercise-type":"CHOICE","answers":{"1":[{"mime":"image/jpeg","text":"560","media":"/system/storage_files/items/000/000/560/original/data?1485719035","correct":true},{"mime":"image/jpeg","text":"561","media":"/system/storage_files/items/000/000/561/original/data?1485719039","correct":false}]},"attachments":[{"id":559,"url":"/system/storage_files/items/000/000/559/original/data?1485719021","type":"audio/mpeg"}]},"relationships":{"tests":{"links":{"self":"http://myenglish.edu.pl:3000/exercises/241/relationships/tests","related":"http://myenglish.edu.pl:3000/exercises/241/tests"}},"storage-files":{"links":{"self":"http://myenglish.edu.pl:3000/exercises/241/relationships/storage-files","related":"http://myenglish.edu.pl:3000/exercises/241/storage-files"}}}},{"id":"242","type":"exercises","links":{"self":"http://myenglish.edu.pl:3000/exercises/242"},"attributes":{"code":"L117","name":"Ćwiczenie 7","command":"Posłuchaj i wybierz poprawną odpowiedź.","data":{"1":""},"status":1,"test-id":48,"exercise-type":"CHOICE","answers":{"1":[{"mime":"image/jpeg","text":"563","media":"/system/storage_files/items/000/000/563/original/data?1485719213","correct":true},{"mime":"image/jpeg","text":"564","media":"/system/storage_files/items/000/000/564/original/data?1485719219","correct":false}]},"attachments":[{"id":562,"url":"/system/storage_files/items/000/000/562/original/data?1485719085","type":"audio/mpeg"}]},"relationships":{"tests":{"links":{"self":"http://myenglish.edu.pl:3000/exercises/242/relationships/tests","related":"http://myenglish.edu.pl:3000/exercises/242/tests"}},"storage-files":{"links":{"self":"http://myenglish.edu.pl:3000/exercises/242/relationships/storage-files","related":"http://myenglish.edu.pl:3000/exercises/242/storage-files"}}}}]}
    ))
  }
}

describe('AnswerComponent', () => {
  let component: AnswerComponent;
  let fixture: ComponentFixture<AnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule, HttpModule ],
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
