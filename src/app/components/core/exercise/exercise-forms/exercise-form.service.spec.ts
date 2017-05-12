import { TestBed, inject } from '@angular/core/testing';

import { ExerciseFormService } from './exercise-form.service';
import {AuthConfig, AuthHttp} from "angular2-jwt";
import {Http, HttpModule} from "@angular/http";

describe('ExerciseFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
          ExerciseFormService,
          {
            provide: AuthHttp,
            useFactory: (http) => {
              return new AuthHttp(new AuthConfig(), http);
            },
            deps: [Http]
          }
      ]
    });
  });

  it('should ...', inject([ExerciseFormService], (service: ExerciseFormService) => {
    expect(service).toBeTruthy();
  }));
});
