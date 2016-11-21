import { Component, OnInit }                       from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router }                                  from '@angular/router';
import { AuthHttp }                                from 'angular2-jwt';
// import { ExcerciseService }                        from '../../../services/excercise.service';
// import { Excercise }                               from '../../../excercise';

const styles = require('./settings.component.scss');
const template = require('./settings.component.html');

@Component({
  selector: 'user-settings',
  template: template,
  styles: [ styles ],
})
export class SettingsComponent {}
