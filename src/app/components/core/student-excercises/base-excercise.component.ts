import { Input } from "@angular/core";
import { Excercise } from "../../../excercise";

export abstract class BaseExcerciseComponent {

    @Input() excercise: Excercise;
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

    updateExcerciseAnswerValues() {
        this.excercise.answers = this.answers;
    }

    // getAnswers() {
    //     return this.answers;
    // }

    hasError(element, word): boolean {
        if (this.excercise.checkResults && this.excercise.checkResults[element] && this.excercise.checkResults[element][word] == false) {
            return true;
        }

        return false;
    }

}
