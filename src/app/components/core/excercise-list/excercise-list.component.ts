import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';

const styles = require('./excercise-list.component.scss');
const template = require('./excercise-list.component.html');

@Component({
  selector: 'excercise-list',
  template: template,
  styles: [ styles ]
})
export class ExcerciseListComponent {}
