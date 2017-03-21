/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { UserService } from 'app/services/user.service';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { provideAuth } from "angular2-jwt";
import { environment } from "environments/environment";

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule, HttpModule ],
      declarations: [ SettingsComponent ],
      providers: [ UserService, provideAuth({
        tokenName: environment.TOKEN_NAME,
        tokenGetter: () => localStorage.getItem(environment.TOKEN_NAME)
      }) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
