import { Component } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { BaseExcerciseComponent } from "../base-excercise.component";

const styles = require('./student-choice.component.scss');
const template = require('./student-choice.component.html');

@Component({
  selector: 'student-choice',
  template: template,
  styles: [ styles ],
})
export class StudentChoiceComponent extends BaseExcerciseComponent {

  readonly storageUrl = environment.API_URL;

  setDefaultReturnValues() {
    let keys = this.keys(this.excercise.data);

    for (let key of keys) {
      this.answers[key] = [];
    }
  }

  isSelected(sentence, choice): boolean {
    return this.answers[sentence].indexOf(choice) > -1;
  }

  hasChoiceResult(sentence, choice): boolean {
    return (this.excercise.checkResults && this.excercise.checkResults[sentence] && typeof this.excercise.checkResults[sentence][choice] !== 'undefined');
  }

  toggleChoice(sentenceId, text) {
    let choiceIndex = this.answers[sentenceId].indexOf(text);
    if (choiceIndex > -1) {
      this.answers[sentenceId].splice(choiceIndex, 1);
    } else {
      this.answers[sentenceId].push(text);
    }
  }
}
