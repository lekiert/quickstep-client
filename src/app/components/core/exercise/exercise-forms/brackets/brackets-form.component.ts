import {Component, Input, Output, EventEmitter} from "@angular/core";

const styles = require('./brackets-form.component.scss');
const template = require('./brackets-form.component.html');

@Component({
  selector: 'brackets-form',
  template: template,
  styles: [ styles ],
})
export class BracketsFormComponent {

  @Input() exercise;
  @Output() updateExercise = new EventEmitter();

  constructor() {}

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
    this.exercise.answers[newIndex] = {};
  }

  deleteSentence(index) {
    delete this.exercise.data[index];
    delete this.exercise.answers[index];
  }

  countSentenceBrackets(sentence) {
    let count = this.parseSentenceBracket(sentence);
    let result = [];
    for (let i = 0; i < count; i++) {
      result.push(i);
    }

    return result;
  }

  parseSentenceBracket(sentence) {
    if (typeof sentence === 'string') {
      return sentence.split("__").length - 1;
    }
  }
}
