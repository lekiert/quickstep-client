import { Component } from "@angular/core";
import { BaseExcerciseComponent } from "../base-excercise.component"

const styles = require('./student-brackets.component.scss');
const template = require('./student-brackets.component.html');

@Component({
  selector: 'student-brackets',
  template: template,
  styles: [ styles ],
})
export class StudentBracketsComponent extends BaseExcerciseComponent {

  constructor(){
    super()
  }

  setDefaultReturnValues() {
    let keys = this.keys(this.excercise.data);
    for (let key of keys) {
      let answerKeysCount = this.splitSentence(this.excercise.data[key]).length - 1;

      this.answers[key] = {};
      for (let i = 0; i < answerKeysCount; i++) {
        this.answers[key][i] = '';
      }
    }
  }

  hasWordResult(sentence, word): boolean {
    return (this.excercise.checkResults && this.excercise.checkResults[sentence] && typeof this.excercise.checkResults[sentence][word] !== 'undefined');
  }

  splitSentence(sentence) {
    return sentence.split('__');
  }
}
