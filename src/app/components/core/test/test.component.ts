import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute, Params }          from '@angular/router';
import { AuthHttp }                                from 'angular2-jwt';
import { TestService }                             from '../../../services/test.service';
import { Excercise }                               from '../../../excercise';
import { Test }                                    from '../../../test';
import { environment }                             from '../../../../environments/environment';

import { StudentBracketsComponent } from '../student-excercises/brackets/student-brackets.component';
import { StudentChoiceComponent } from '../student-excercises/choice/student-choice.component';

const styles = require('./test.component.scss');
const template = require('./test.component.html');

@Component({
  selector: 'test',
  template: template,
  styles: [ styles ],
})
export class TestComponent {

  storageUrl = environment.API_URL;
  id: number;
  private sub: any;
  test: Test;
  excercises: Excercise[];
  results = [];
  answers = {};

  constructor(
    private route: ActivatedRoute,
    private service: TestService) {

    }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];

       this.service.getTest(this.id).then((test) => {
         this.test = test;
       });

       this.service.getTestRelatedExcercises(this.id).then((excercises) => {
         this.excercises = excercises;
         for (let i in this.excercises) {
           this.answers[i] = {};
         }
       });
    });
  }

  createExcercisesResults() {

  }

  getTest() {

  }

  logResults(event) {
    console.log(event);
  }

  getExcercisesAnswers() {
    for (let answer in this.answers) {
      console.log(this.answers[answer]);
    }
  }

}
