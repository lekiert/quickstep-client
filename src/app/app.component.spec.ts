/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from "@angular/http";
import { provideAuth } from 'angular2-jwt';
import { environment } from '../environments/environment';
import { AuthGuard } from './common/auth.guard';
import { UserService } from './services/user.service';

describe('App: QuickstepClient', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpModule ],
      declarations: [
        AppComponent
      ],
      providers: [
        UserService,
        AuthGuard,
        provideAuth({
          tokenName: environment.TOKEN_NAME,
          tokenGetter: () => localStorage.getItem(environment.TOKEN_NAME)
        })
      ]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
