import { Component, OnInit }                       from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute, Params }          from '@angular/router';
import { AuthHttp }                                from 'angular2-jwt';
import { TestService }                             from '../../../services/test.service';
import { Excercise }                               from '../../../excercise';
import { Test }                                    from '../../../test';

const styles = require('./test.component.scss');
const template = require('./test.component.html');

@Component({
  selector: 'test',
  template: template,
  styles: [ styles ],
})
export class TestComponent {

  id: number;
  private sub: any;
  test: Test;
  excercises: Excercise[];

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
       });
    });
  }

  getTest() {

  }


}
