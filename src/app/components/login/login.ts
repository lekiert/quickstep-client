import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';

const theme   = require('../../style.scss');
const styles   = require('./login.scss');
const template = require('./login.html');

@Component({
  selector: 'login',
  template: template,
  styles: [ theme, styles ]
})
export class Login {
  constructor(public router: Router, public http: Http) {
  }

  error = false;

  login(event, username, password) {
    event.preventDefault();
    
    this.error = false;
    let body = {auth : { email: username, password: password } };
    this.http.post(process.env.API_URL + 'user_token', body, { headers: contentHeaders })
      .subscribe(
        response => {
          localStorage.setItem('jwt', response.json().jwt);
          this.router.navigate(['home']);
        },
        error => {
          this.error = true;
        }
      );
  }

  signup(event) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }
}
