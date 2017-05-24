/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { InformationService } from './information.service';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {Http, HttpModule} from "@angular/http";

describe('InformationService', () => {

  let service: InformationService;

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

    service = TestBed.get(InformationService);
  });

  it('should create an instance', () => {
    expect(service).toBeDefined();
  });
});
