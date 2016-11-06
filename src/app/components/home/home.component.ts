import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { Excercise } from '../../excercise';
import { contentHeaders } from '../../common/headers';

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

  callAnonymousApi() {
    this._callApi(process.env.API_URL + 'excercises');
  }

  callSecuredApi() {
    this._callApi(process.env.API_URL + 'excercises');
  }

  _callApi(url) {
    console.log(contentHeaders);
    this.response = null;
    this.authHttp.get(url, { headers: contentHeaders })
    .map(res => res.json())
    .subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('yay')
    );
    // .toPromise()
    // .then((response: Response) => {
    //   console.log(response);
    //   response.json().data as Excercise[]
    // })
    // .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
