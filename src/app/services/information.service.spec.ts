/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InformationService } from './information.service';
import {AuthConfig, AuthHttp, provideAuth} from 'angular2-jwt';
import { environment } from '../../environments/environment';
import {Http, HttpModule} from "@angular/http";

describe('InformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
          HttpModule
      ],
      providers: [
        InformationService,
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

  it('should create', inject([InformationService], (service: InformationService) => {
    expect(service).toBeTruthy();
  }));
});
