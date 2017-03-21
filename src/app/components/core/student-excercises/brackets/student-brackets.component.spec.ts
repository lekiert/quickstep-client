/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {FormsModule} from "@angular/forms";
import {StudentBracketsComponent} from "./student-brackets.component";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpModule} from "@angular/http";
import {Excercise} from "app/excercise";

describe('StudentBracketsComponent', () => {
  let component: StudentBracketsComponent;
  let fixture: ComponentFixture<StudentBracketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule, HttpModule ],
      declarations: [ StudentBracketsComponent, StudentBracketsComponent ],
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBracketsComponent);
    component = fixture.componentInstance;


    let expectedExcercise = new Excercise(42, {
      id: 42,
      code: 'TEST_EX',
      testId: 1,
      command: 'Test excercise command',
      name: 'Test excercise',
      data: {},
      answers: {}
    });
    component.excercise = expectedExcercise;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should split sentences by __', () => {
    let testString = 'aaa __ bbb __ ccc';
    let testResult = component.splitSentence(testString)
    expect(testResult.length).toBe(3);
  });


});
