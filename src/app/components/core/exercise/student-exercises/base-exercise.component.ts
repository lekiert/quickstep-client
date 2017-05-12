import { Input } from "@angular/core";
import { Exercise } from "app/exercise";
import {PreparesOutputInterface} from "./prepares-output.interface";

export abstract class BaseExerciseComponent implements PreparesOutputInterface {

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

    hasError(element, word): boolean {
        return (this.exercise.checkResults &&
            this.exercise.checkResults[element] &&
            this.exercise.checkResults[element][word] == false);
    }

}
