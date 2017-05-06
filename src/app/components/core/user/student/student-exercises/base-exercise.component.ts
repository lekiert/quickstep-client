import { Input } from "@angular/core";
import { Exercise } from "app/exercise";

export abstract class BaseExerciseComponent {

    @Input() exercise: Exercise;
    @Input() answers = {};
    @Input() setDefaults: boolean = true;

    abstract setDefaultReturnValues(): void;

    keys(dict) : Array<string> {
        return Object.keys(dict);
    }

    ngOnInit(): void {
        if (this.setDefaults) {
            this.setDefaultReturnValues();
        }
    }

    updateExerciseAnswerValues() {
        this.exercise.answers = this.answers;
    }

    // getAnswers() {
    //     return this.answers;
    // }

    hasError(element, word): boolean {
        if (this.exercise.checkResults && this.exercise.checkResults[element] && this.exercise.checkResults[element][word] == false) {
            return true;
        }

        return false;
    }

}
