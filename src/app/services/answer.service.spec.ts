import { TestBed, inject } from '@angular/core/testing';
import { AnswerService } from './answer.service';
import { BaseService } from './base.service';
import { provideAuth } from 'angular2-jwt';
import { environment } from 'environments/environment';
import { HttpModule } from "@angular/http";

describe('AnswerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [ AnswerService, BaseService, provideAuth({
        tokenName: environment.TOKEN_NAME,
        tokenGetter: () => localStorage.getItem(environment.TOKEN_NAME) // tmp bug in angular2-jwt fix
      }) ]
    });
  });

  it('should be created', inject([ AnswerService ], (service: AnswerService) => {
    expect(service).toBeTruthy();
  }));
});
