import { Component, OnInit, Input, Output, EventEmitter }  from '@angular/core';
import { DomSanitizer }                            from '@angular/platform-browser';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute }                  from '@angular/router';
import { Excercise }                               from '../../../../excercise';

const styles = require('./student-brackets.component.scss');
const template = require('./student-brackets.component.html');

@Component({
  selector: 'student-brackets',
  template: template,
  styles: [ styles ],
})
export class StudentBracketsComponent {

  constructor(private sanitizer: DomSanitizer){}

  @Input() excercise: Excercise;
  @Output() collectResults = new EventEmitter();
  @Input() answers = {};
  @Input() setDefaults: boolean = true;

  sentenceCount = 0;
  sentenceRange = [];
  wordCount = [];
  resultVal = {};

  setDefaultReturnValues() {
    let keys = this.keys(this.excercise.data);
    for (let key of keys) {
      let answerKeysCount = this.splitSentence(this.excercise.data[key]).length - 1;

      this.answers[key] = {};
      for (let i = 0; i < answerKeysCount; i++) {
        this.answers[key][i] = '';
      }
    }
  }

  hasError(sentence, word): boolean {
    if (this.excercise.checkResults && this.excercise.checkResults[sentence] && this.excercise.checkResults[sentence][word] == false) {
      return true;
    }

    return false;
  }

  hasWordResult(sentence, word): boolean {
    return (this.excercise.checkResults && this.excercise.checkResults[sentence] && typeof this.excercise.checkResults[sentence][word] !== 'undefined');
  }

  keys(dict) : Array<string> {
    return Object.keys(dict);
  }

  ngOnInit(): void {
    if (this.setDefaults) {
      this.setDefaultReturnValues();
    }
  }

  updateExcerciseAnswerValues() {
    this.excercise.answers = this.answers;
  }

  splitSentence(sentence) {
    return sentence.split('__');
  }

  getAnswers() {
    return this.answers;
  }

}
