/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from "@angular/forms";
import { AnswerComponent } from './answer.component';
import { StudentBracketsComponent } from '../student-excercises/brackets/student-brackets.component';
import { StudentChoiceComponent } from '../student-excercises/choice/student-choice.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../../services/user.service';
import { TestService } from '../../../services/test.service';
import { provideAuth } from 'angular2-jwt';
import { environment } from '../../../../environments/environment';
import { HttpModule } from "@angular/http";

describe('AnswerComponent', () => {
  let component: AnswerComponent;
  let fixture: ComponentFixture<AnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule, HttpModule ],
      declarations: [ AnswerComponent, StudentBracketsComponent, StudentChoiceComponent ],
      providers: [ UserService, TestService, provideAuth({
        tokenName: environment.TOKEN_NAME,
        tokenGetter: () => localStorage.getItem(environment.TOKEN_NAME)
      }) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
