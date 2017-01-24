import { Component, OnInit, Input, Output, EventEmitter }  from '@angular/core';
import { AuthHttp }                                from 'angular2-jwt';
import { Excercise }                               from '../../../../excercise';

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

  ngOnInit(): void {
    let sentences = this.excercise.data;
    let answers = this.excercise.answers;
    // this.excercise.data = {
    //   sentences: []
    // }
    // for (var index in sentences) {
    //   this.excercise.data.sentences.push({
    //     questionSentence: sentences[index].questionSentence, answers: answers[index]
    //   });
    // }
  }

  addSentence() {
    this.excercise.data.sentences.push({ questionSentence: "", answers: {} });
  }

  deleteSentence(index) {
    this.excercise.data.sentences.splice(index, 1);
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
