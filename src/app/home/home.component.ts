import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';

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
  api: string;

  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('jwt');
    this.decodedJwt = this.jwt && jwt_decode(this.jwt);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['login']);
  }

  callAnonymousApi() {
    this._callApi('Anonymous', 'http://localhost:3000/excercises');
  }

  callSecuredApi() {
    this._callApi('Secured', 'http://localhost:3000/excercises');
  }

  _callApi(type, url) {
    this.response = null;
    if (type === 'Anonymous') {
      // For non-protected routes, just use Http
      this.http.get(url)
        .subscribe(
          response => this.response = response.text(),
          error => this.response = error.text()
        );
    }
    if (type === 'Secured') {
      // For protected routes, use AuthHttp
      this.authHttp.get(url)
        .subscribe(
          response => this.response = response.text(),
          error => this.response = error.text()
        );
    }
  }
}
