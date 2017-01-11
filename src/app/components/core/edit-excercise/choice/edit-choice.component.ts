import { Component, OnInit, Input, Output, EventEmitter }  from '@angular/core';
import { AuthHttp }                                from 'angular2-jwt';
import { Excercise }                               from '../../../../excercise';

const styles = require('./edit-choice.component.scss');
const template = require('./edit-choice.component.html');

@Component({
  selector: 'edit-choice',
  template: template,
  styles: [ styles ],
})
export class EditChoiceComponent {

  @Input() excercise;
  @Output() updateExcercise = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    let sentences = this.excercise.data.sentences;
    let answers = this.excercise.answers;
    this.excercise.data = {
      sentences: []
    }
    sentences.forEach((item, index) => {
      console.log(item);
      this.excercise.data.sentences.push({
        questionSentence: item.questionSentence, answers: answers[index]
      });
    });
  }

  addSentence() {
    this.excercise.data.sentences.push({ questionSentence: "", answers: [] });
  }

  addOption(sentenceId) {
    this.excercise.data.sentences[sentenceId].answers.push({ text: '', correct: false })
  }

  updateExcerciseData() {
    let data = this.excercise.data.sentences;
    let excercise = this.excercise;
    let answers = this.excercise.data.sentences.map((sentence) => {
      return sentence.answers;
    });
    this.excercise.answers = answers;
    this.updateExcercise.emit(excercise);
  }

}
