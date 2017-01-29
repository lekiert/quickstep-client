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

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  sub: any;
  id: any;
  test: Test;
  user: User;
  excercises: Excercise[];
  answers: {};
  score: any;
  answer: any;
  private answersUrl = environment.API_URL + 'answers';  // URL to web API
  storageUrl = environment.API_URL;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private service: TestService) {

    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];

       this.service.getAnswer(this.id).then((answer) => {
         this.answers = answer.data.attributes.answers;
         console.log(answer);
         this.score = (answer.data.attributes.score.score / answer.data.attributes.score.max * 100).toFixed()

         if (answer.included) {
           for (let res of answer.included) {
              if (res.type === 'tests') {
                this.test = new Test(res.id, res.attributes);

                this.service.getTestRelatedExcercises(res.id).then((excercises) => {

                  this.excercises = excercises;
                });
              }
              if (res.type === 'users') {
                this.user = new User(res.id, res.attributes);
              }
           }
         }
       });
    });
  }

}
