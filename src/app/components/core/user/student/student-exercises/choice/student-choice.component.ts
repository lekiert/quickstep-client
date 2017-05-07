import { Component } from "@angular/core";
import { environment } from "environments/environment";
import { BaseExerciseComponent } from "../base-exercise.component";
import { PreparesOutputInterface } from "../prepares-output.interface";

const styles = require('./student-choice.component.scss');
const template = require('./student-choice.component.html');

@Component({
  selector: 'student-choice',
  template: template,
  styles: [ styles ],
})
export class StudentChoiceComponent extends BaseExerciseComponent implements PreparesOutputInterface {

  readonly storageUrl = environment.API_URL;

  setDefaultReturnValues() {
    let keys = this.keys(this.exercise.data);

    for (let key of keys) {
      this.answers[key] = [];
    }
  }

  isSelected(sentence, choice): boolean {
    return this.answers[sentence].indexOf(choice) > -1;
  }

  hasChoiceResult(sentence, choice): boolean {
    return (this.exercise.checkResults && this.exercise.checkResults[sentence] && typeof this.exercise.checkResults[sentence][choice] !== 'undefined');
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
