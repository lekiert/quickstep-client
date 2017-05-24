import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {AuthHttp} from "angular2-jwt";

const styles = require('./home.component.scss');
const template = require('./home.component.html');

var jwt_decode = require('jwt-decode');

@Component({
  selector: 'home',
  template: template,
  styles: [ styles ]
})
export class HomeComponent {
  jwt: string;
  decodedJwt: string;
  response: string;

  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('jwt');
    this.decodedJwt = this.jwt && jwt_decode(this.jwt);
  }
}
