import { Component, OnInit, Input, Output, EventEmitter }  from '@angular/core';
import { AuthHttp }                                from 'angular2-jwt';
import { Excercise }                               from '../../../../excercise';

const styles = require('./edit-brackets.component.scss');
const template = require('./edit-brackets.component.html');

@Component({
  selector: 'edit-brackets',
  template: template,
  styles: [ styles ],
})
export class EditBracketsComponent {

  @Input() excercise;
  @Output() updateExcercise = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    console.log(this.excercise)
    let sentences = this.excercise.data;
    let answers = this.excercise.answers;
    this.excercise.data = {
      sentences: []
    }
    console.log(answers);
    sentences.forEach((item, index) => {
      this.excercise.data.sentences.push({
        questionSentence: item, answers: answers[index]
      });
    });
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
    if (typeof sentence === 'string') {
      return sentence.split("__").length - 1;
    }
  }

  updateExcerciseData() {
    let data = this.excercise.data.sentences;
    let excercise = this.excercise;
    let answers = {};
    excercise.data = data.map((sentence) => { return sentence.questionSentence });
    data.forEach((sentence, index) => { answers[index] = sentence.answers });
    excercise.answers = answers;
    this.updateExcercise.emit(excercise);
  }

}
