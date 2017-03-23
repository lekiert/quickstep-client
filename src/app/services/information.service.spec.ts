/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InformationService } from './information.service';
import { provideAuth } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { HttpModule } from "@angular/http";

describe('InformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
          HttpModule
      ],
      providers: [
        InformationService,
        provideAuth({
          tokenName: environment.TOKEN_NAME,
          tokenGetter: () => localStorage.getItem(environment.TOKEN_NAME) // tmp bug in angular2-jwt fix
        })
      ]
    });
  });

  it('should create', inject([InformationService], (service: InformationService) => {
    expect(service).toBeTruthy();
  }));
});
