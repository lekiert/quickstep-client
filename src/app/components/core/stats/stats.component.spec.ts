/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsComponent } from './stats.component';
import { SettingsComponent } from '../settings/settings.component';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { InformationService } from "app/services/information.service";
import { AnswerService } from "app/services/answer.service";
import { provideAuth } from "angular2-jwt";
import { environment } from "environments/environment";
import { HttpModule } from "@angular/http";
import { UserService } from "app/services/user.service";

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule, HttpModule ],
      declarations: [ StatsComponent, SettingsComponent ],
      providers: [ InformationService, UserService, AnswerService, provideAuth({
          tokenName: environment.TOKEN_NAME,
          tokenGetter: () => localStorage.getItem(environment.TOKEN_NAME)
      }) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
