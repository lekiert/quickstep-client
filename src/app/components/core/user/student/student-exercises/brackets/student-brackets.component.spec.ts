/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {FormsModule} from "@angular/forms";
import {StudentBracketsComponent} from "./student-brackets.component";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpModule} from "@angular/http";
import {Exercise} from "app/exercise";
import {By} from "@angular/platform-browser";

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


    let expectedExercise = new Exercise(42, {
      id: 42,
      code: 'TEST_EX',
      testId: 1,
      command: 'Test exercise command',
      name: 'Test exercise',
      data: {"1": "A __ B.", "2": "A __ B. C __ D __ E."},
      answers: {}
    });
    component.exercise = expectedExercise;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should split sentences by __', () => {
    let testString = 'aaa __ bbb __ ccc';
    let testResult = component.splitSentence(testString);
    expect(testResult.length).toBe(3);
  });

  it('should create input fields', () => {
    let inputs = fixture.debugElement.queryAll(By.css('input.word'))
    expect(inputs.length).toBe(4);
  });

  it('should create default return values', () => {
    let answers = component.answers;
    expect(Object.keys(answers).length).toBe(2);
    expect(Object.keys(answers[1]).length).toBe(1);
    expect(Object.keys(answers[2]).length).toBe(3);
  });

});
