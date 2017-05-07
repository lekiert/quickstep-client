/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaseService } from './base.service';
import {AuthConfig, AuthHttp} from "angular2-jwt";
import {Http, HttpModule} from "@angular/http";

describe('BaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
          BaseService,
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

  it('should ...', inject([BaseService], (service: BaseService) => {
    expect(service).toBeTruthy();
  }));
});
