import { Component, OnInit, Input, Output, EventEmitter }  from '@angular/core';
import { DomSanitizer }                            from '@angular/platform-browser';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute }                  from '@angular/router';

const styles = require('./student-choice.component.scss');
const template = require('./student-choice.component.html');

@Component({
  selector: 'student-choice',
  template: template,
  styles: [ styles ],
})
export class StudentChoiceComponent {

  constructor(private sanitizer: DomSanitizer){}

  data: any;
  @Input() excercise: any;
  @Output() collectResults = new EventEmitter();

  sentenceCount = 0;
  sentenceRange = [];
  wordCount = [];
  resultVal = [];

  setDefaultReturnValues() {
    for (let sentence of this.excercise.data.sentences) {
      this.resultVal.push([]);
    }
  }

  ngOnInit(): void {
    this.data = this.excercise.data;
    this.setDefaultReturnValues();
  }

  updateExcerciseAnswerValues() {
    this.excercise.answers = this.resultVal;
  }

  splitSentence(sentence) {
    return sentence.split('__');
  }

  getAnswers() {
    console.log(this.resultVal);
    return this.resultVal;
  }

  toggleChoice(sentenceId, text) {
    let choiceIndex = this.resultVal[sentenceId].indexOf(text);
    if (choiceIndex > -1) {
      this.resultVal[sentenceId].splice(choiceIndex, 1);
    } else {
      this.resultVal[sentenceId].push(text);
    }
  }

}
