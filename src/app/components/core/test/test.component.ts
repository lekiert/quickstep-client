import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute, Params }          from '@angular/router';
import { AuthHttp }                                from 'angular2-jwt';
import { TestService }                             from '../../../services/test.service';
import { Excercise }                               from '../../../excercise';
import { Test }                                    from '../../../test';
import { User }                                    from '../../../user';
import { environment }                             from '../../../../environments/environment';
import { UserService }                        from '../../../services/user.service';

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

  private answersUrl = environment.API_URL + 'answers';  // URL to web API
  storageUrl = environment.API_URL;
  id: number;
  private sub: any;
  test: Test;
  user: User;
  excercises: Excercise[];
  results = [];
  answers = {};
  private hasResults:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private service: TestService) {
      this.userService.getAuthenticatedUserObject().then(
        user => { this.user = user; }
      );
    }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];

       this.service.getTest(this.id).then((test) => {
         this.test = test;
       });

       this.service.getTestRelatedExcercises(this.id).then((excercises) => {
         this.excercises = excercises;
         for (let excercise of this.excercises) {
           this.answers[excercise.id] = {};
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
    console.log(this.answers);
  }

  submitAnswers() {
    this.service.submitAnswers(this.id, this.user.id, this.answers).then(results => {
      this.setExcerciseResults(results.json().data.attributes.results);
    });
  }

  setExcerciseResults(results): void {
    for (let i in results) {
      for (let j in this.excercises) {

        if (+i === +this.excercises[j].id) {
          this.excercises[j].checkResults = results[i];
        }
      }
    }

    this.hasResults = true;
  }

}
