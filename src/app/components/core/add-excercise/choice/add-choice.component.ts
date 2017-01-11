import { Component, OnInit, Input, Output, EventEmitter }  from '@angular/core';
import { AuthHttp }                                from 'angular2-jwt';
import { Excercise }                               from '../../../../excercise';

const styles = require('./add-choice.component.scss');
const template = require('./add-choice.component.html');

@Component({
  selector: 'add-choice',
  template: template,
  styles: [ styles ],
})
export class AddChoiceComponent {

  @Input() excerciseType;
  @Output() addExcercise = new EventEmitter();
  excercise: Excercise = new Excercise(null, {
    'excercise-type': 'CHOICE',
    name: '',
    command: '',
    code: '',
    data: {},
    answers: {}
  });

  constructor() {}

  ngOnInit(): void {
    this.excercise.data = {
      sentences: [
        { questionSentence: "", answers: [] }
      ]
    }
  }

  addSentence() {
    this.excercise.data.sentences.push({ questionSentence: "", answers: [] });
  }

  addOption(sentenceId) {
    console.log(this.excercise.data.sentences[sentenceId]);
    this.excercise.data.sentences[sentenceId].answers.push({ text: '', correct: false })
  }

  addExcerciseToTest() {
    let data = this.excercise.data.sentences;
    let excercise = this.excercise;
    let answers = this.excercise.data.sentences.map((sentence) => {
      return sentence.answers;
    });
    this.excercise.answers = answers;
    this.addExcercise.emit(excercise);
  }

}
