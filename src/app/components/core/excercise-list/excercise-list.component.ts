import { Component, OnInit }                       from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router }                                  from '@angular/router';
import { AuthHttp }                                from 'angular2-jwt';
import { ExcerciseService }                        from '../../../services/excercise.service';
import { Excercise }                               from '../../../excercise';

const styles = require('./excercise-list.component.scss');
const template = require('./excercise-list.component.html');

@Component({
  selector: 'excercise-list',
  template: template,
  styles: [ styles ],
})
export class ExcerciseListComponent {
  constructor(private service: ExcerciseService) {

  }

  excercises: Excercise[];

  getExcercises(): void {
    this.service.getExcercises()
                .then((excercises) => {
                  this.excercises = excercises;
                });
  }

  ngOnInit(): void {
    this.getExcercises();
  }

  ping() {
    this.service.ping();
  }
}
