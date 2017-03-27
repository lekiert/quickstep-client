/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {FormsModule} from "@angular/forms";
import {StudentChoiceComponent} from "./student-choice.component";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpModule} from "@angular/http";
import {Excercise} from "app/excercise";
import {By} from "@angular/platform-browser";

describe('StudentChoiceComponent', () => {
    let component: StudentChoiceComponent;
    let fixture: ComponentFixture<StudentChoiceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule, RouterTestingModule, HttpModule ],
            declarations: [ StudentChoiceComponent ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StudentChoiceComponent);
        component = fixture.componentInstance;


        let expectedExcercise = new Excercise(1, {
            id: 1,
            code: 'TEST_EX',
            testId: 1,
            command: 'Test excercise command',
            name: 'Test excercise',
            data: {"1": "5 + 5", "2": "8 + 1", "3": "4 + 2", "4": "1 + 7", "5": "3 + 4"},
            answers: {
                "1": [{"text": "seven", "correct": false}, {"text": "nine", "correct": false}, {"text": "ten", "correct": true}],
                "2": [{"text": "nine", "correct": true}, {"text": "six", "correct": false}, {"text": "three", "correct": false}],
                "3": [{"text": "four", "correct": false}, {"text": "five", "correct": false}, {"text": "six", "correct": true}],
                "4": [{"text": "six", "correct": false}, {"text": "eight", "correct": true}, {"text": "nine", "correct": false}],
                "5": [{"text": "seven", "correct": true}, {"text": "two", "correct": false}, {"text": "four", "correct": false}]
            }
        });
        component.excercise = expectedExcercise;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create boxes', () => {
        let boxes = fixture.debugElement.queryAll(By.css('.choice-options__option'))
        expect(boxes.length).toBe(15);
    });

    it('should create checkboxes', () => {
        let inputs = fixture.debugElement.queryAll(By.css('.choice-options__option__input'))
        expect(inputs.length).toBe(15);
    });

    it('should create boxes that contain answers', () => {
        let boxes = fixture.debugElement.queryAll(By.css('.choice-options__option div:first-child'))

        expect(boxes[0].nativeElement.innerText).toBe("seven");
        expect(boxes[1].nativeElement.innerText).toBe("nine");
        expect(boxes[2].nativeElement.innerText).toBe("ten");

        expect(boxes[6].nativeElement.innerText).toBe("four");
        expect(boxes[7].nativeElement.innerText).toBe("five");
        expect(boxes[8].nativeElement.innerText).toBe("six");

    });

});
