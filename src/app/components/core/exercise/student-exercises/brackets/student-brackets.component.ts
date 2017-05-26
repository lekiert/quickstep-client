import { Component } from "@angular/core";
import { BaseExerciseComponent } from "../base-exercise.component"
import { PreparesOutputInterface } from "../prepares-output.interface";

const styles = require('./student-brackets.component.scss');
const template = require('./student-brackets.component.html');

@Component({
  selector: 'student-brackets',
  template: template,
  styles: [ styles ],
})
export class StudentBracketsComponent extends BaseExerciseComponent implements PreparesOutputInterface {

  constructor() {
    super()
  }

  setDefaultReturnValues() {
    let keys = this.keys(this.exercise.data);
    for (let key of keys) {
      let answerKeysCount = this.splitSentence(this.exercise.data[key]).length - 1;

      this.answers[key] = {};
      for (let i = 0; i < answerKeysCount; i++) {
        this.answers[key][i] = '';
      }
    }
  }

  hasWordResult(sentence, word): boolean {
    return (this.exercise.checkResults
         && this.exercise.checkResults[sentence]
         && typeof this.exercise.checkResults[sentence][word] !== 'undefined');
  }

  splitSentence(sentence) {
    return sentence.split('__');
  }
}
