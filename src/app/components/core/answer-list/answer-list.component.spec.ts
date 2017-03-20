/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AnswerListComponent } from './answer-list.component';
import { UserService } from '../../../services/user.service';
import { TestService } from '../../../services/test.service';
import { provideAuth } from 'angular2-jwt';
import { environment } from '../../../../environments/environment';
import { HttpModule } from "@angular/http";

describe('AnswerListComponent', () => {
  let component: AnswerListComponent;
  let fixture: ComponentFixture<AnswerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpModule ],
      declarations: [ AnswerListComponent ],
      providers: [ UserService, TestService, provideAuth({
        tokenName: environment.TOKEN_NAME,
        tokenGetter: () => localStorage.getItem(environment.TOKEN_NAME) // tmp bug in angular2-jwt fix
      }) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
