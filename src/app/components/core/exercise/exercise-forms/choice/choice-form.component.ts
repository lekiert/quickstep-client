import {Component, Input} from "@angular/core";
import {ExerciseFormInterface} from "../exercise-form.interface";
import {Exercise} from "app/exercise";

const styles = require('./choice-form.component.scss');
const template = require('./choice-form.component.html');

@Component({
  selector: 'choice-form',
  template: template,
  styles: [ styles ],
})
export class ChoiceFormComponent implements ExerciseFormInterface {

  @Input() exercise: Exercise;

  keys(dict) : Array<string> {
    return Object.keys(dict);
  }

  addSentence() {
    let lastIndex = 0;
    let keys = this.keys(this.exercise.data).map((val) => { return parseInt(val) });
    if (keys.length > 0) {
      lastIndex = Math.max(...keys);
    }
    let newIndex = lastIndex + 1;
    this.exercise.data[newIndex] = '';
    this.exercise.answers[newIndex] = [];
  }

  addOption(sentenceId) {
    this.exercise.answers[sentenceId].push({ text: '', correct: false });
  }

  deleteSentence(index) {
    delete this.exercise.data[index];
    delete this.exercise.answers[index];
  }

  setAnswerAsMedia(evt, sentence, answer) {
    this.exercise.answers[sentence][answer].text = evt.id;
    this.exercise.answers[sentence][answer].media = evt.attributes.item;
    this.exercise.answers[sentence][answer].mime = evt.attributes.mime;
  }

}
