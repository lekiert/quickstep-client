import { Component, OnInit, Input, Output, EventEmitter }  from '@angular/core';
import { DomSanitizer }                            from '@angular/platform-browser';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute }                  from '@angular/router';

const styles = require('./student-brackets.component.scss');
const template = require('./student-brackets.component.html');

@Component({
  selector: 'student-brackets',
  template: template,
  styles: [ styles ],
})
export class StudentBracketsComponent {

  constructor(private sanitizer: DomSanitizer){}

  data: any;
  @Input() excercise: any;
  @Output() collectResults = new EventEmitter();

  sentenceCount = 0;
  sentenceRange = [];
  wordCount = [];
  resultVal = {};

  setDefaultReturnValues() {
    for (let sentence of this.data.sentences) {
      this.resultVal[this.sentenceCount] = {};
      let bracketCount = sentence.split('__').length -1;
      let wordCountRange = [];

      for (let i = 0; i < bracketCount; i++) {
        wordCountRange.push(i);
        this.resultVal[this.sentenceCount][i] = "";
      }

      this.wordCount.push(wordCountRange);
      this.sentenceRange.push(this.sentenceCount);
      this.sentenceCount++;
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

}
