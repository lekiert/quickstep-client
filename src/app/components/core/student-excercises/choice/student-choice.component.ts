import {Component, Input, Output, EventEmitter} from "@angular/core";
import {environment} from "../../../../../environments/environment";

const styles = require('./student-choice.component.scss');
const template = require('./student-choice.component.html');

@Component({
  selector: 'student-choice',
  template: template,
  styles: [ styles ],
})
export class StudentChoiceComponent {

  @Input() excercise: any;
  @Output() collectResults = new EventEmitter();
  @Input() answers = {};
  @Input() setDefaults: boolean = true;

  storageUrl = environment.API_URL;

  setDefaultReturnValues() {
    let keys = this.keys(this.excercise.data);

    for (let key of keys) {
      this.answers[key] = [];
    }
  }


  keys(dict) : Array<string> {
    return Object.keys(dict);
  }

  ngOnInit(): void {
    if (this.setDefaults) {
      this.setDefaultReturnValues();
    }
  }

  isSelected(sentence, choice): boolean {
    return this.answers[sentence].indexOf(choice) > -1;
  }

  hasError(sentence, choice): boolean {
    if (this.excercise.checkResults && this.excercise.checkResults[sentence] && this.excercise.checkResults[sentence][choice] == false) {
      return true;
    }

    return false;
  }

  hasChoiceResult(sentence, choice): boolean {
    return (this.excercise.checkResults && this.excercise.checkResults[sentence] && typeof this.excercise.checkResults[sentence][choice] !== 'undefined');
  }

  //
  // getAnswers() {
  //   return this.answers;
  // }

  toggleChoice(sentenceId, text) {
    let choiceIndex = this.answers[sentenceId].indexOf(text);
    if (choiceIndex > -1) {
      this.answers[sentenceId].splice(choiceIndex, 1);
    } else {
      this.answers[sentenceId].push(text);
    }
  }

}
