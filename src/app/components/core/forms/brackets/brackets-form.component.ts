import {Component, Input, Output, EventEmitter} from "@angular/core";

const styles = require('./brackets-form.component.scss');
const template = require('./brackets-form.component.html');

@Component({
  selector: 'brackets-form',
  template: template,
  styles: [ styles ],
})
export class BracketsFormComponent {

  @Input() excercise;
  @Output() updateExcercise = new EventEmitter();

  constructor() {}

  keys(dict) : Array<string> {
    return Object.keys(dict);
  }

  addSentence() {
    let lastIndex = 0;
    let keys = this.keys(this.excercise.data).map((val) => { return parseInt(val) });
    if (keys.length > 0) {
      lastIndex = Math.max(...keys);
    }
    let newIndex = lastIndex + 1;
    this.excercise.data[newIndex] = '';
    this.excercise.answers[newIndex] = {};
  }

  deleteSentence(index) {
    delete this.excercise.data[index];
    delete this.excercise.answers[index];
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
