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

  @Input() excercise: any;
  @Output() collectResults = new EventEmitter();
  @Input() answers = {};

  sentenceCount = 0;
  sentenceRange = [];
  wordCount = [];

  setDefaultReturnValues() {
    let keys = this.keys(this.excercise.data);

    for (let key of keys) {
      this.answers[key] = [];
    }
  }


  keys(dict) : Array<string> {
    return Object.keys(dict);
  }

  ngOnInit(): void {
    this.setDefaultReturnValues();
  }

  updateExcerciseAnswerValues() {
    this.excercise.answers = this.answers;
  }


  getAnswers() {
    console.log(this.answers);
    return this.answers;
  }

  toggleChoice(sentenceId, text) {
    let choiceIndex = this.answers[sentenceId].indexOf(text);
    if (choiceIndex > -1) {
      this.answers[sentenceId].splice(choiceIndex, 1);
    } else {
      this.answers[sentenceId].push(text);
    }
  }

}
