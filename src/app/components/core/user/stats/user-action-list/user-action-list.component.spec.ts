import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionListComponent } from './user-action-list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {UserAction} from "../../../../../user-action";
import {By} from "@angular/platform-browser";

describe('UserActionListComponent', () => {
  let component: UserActionListComponent;
  let fixture: ComponentFixture<UserActionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ UserActionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let actions = [
        new UserAction(1, {
          description: 'USER_HAS_BEEN_CREATED',
          'user-name': 'Użytkownik 1',
        }),
        new UserAction(1, {
          description: 'USER_HAS_BEEN_UPDATED',
          'user-name': 'Użytkownik 2',
        })
    ];

    fixture = TestBed.createComponent(UserActionListComponent);
    component = fixture.componentInstance;
    component.actions = actions;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a table', () => {
    let table = fixture.debugElement.query(By.css('table.table'));
    expect(table).toBeTruthy();
  })

  it('should display 2 rows', () => {
    let rows = fixture.debugElement.queryAll(By.css('table.table tbody tr'));
    expect(rows.length).toBe(2);
  })
});
