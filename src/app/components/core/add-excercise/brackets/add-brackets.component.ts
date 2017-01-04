import { Component, OnInit, Input, Output, EventEmitter }  from '@angular/core';
import { AuthHttp }                                from 'angular2-jwt';
import { Excercise }                               from '../../../../excercise';

const styles = require('./add-brackets.component.scss');
const template = require('./add-brackets.component.html');

@Component({
  selector: 'add-brackets',
  template: template,
  styles: [ styles ],
})
export class AddBracketsComponent {

  @Input() excerciseType;
  @Output() addExcercise = new EventEmitter();
  excercise: Excercise = new Excercise(null, {
    name: '',
    command: '',
    code: '',
    data: {}
  });

  constructor() {}

  ngOnInit(): void {
    this.excercise.data = {
      sentences: [
        { questionSentence: "", answers: {} }
      ]
    }
  }

  addSentence() {
    this.excercise.data.sentences.push({ questionSentence: "", answers: {} });
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
    return sentence.split("__").length - 1;
  }

  addExcerciseToTest() {
    let data = this.excercise.data.sentences;
    let excercise = this.excercise;
    excercise.data.sentences = data.map((sentence) => { return sentence.questionSentence })
    this.addExcercise.emit(excercise);
  }

}
