import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import { AuthGuard } from '../../common/auth.guard';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';

const theme   = require('../../style.scss');
const styles   = require('./login.scss');
const template = require('./login.html');

@Component({
  selector: 'login',
  template: template,
  styles: [ theme, styles ]
})
export class Login {
  constructor(public router: Router,
              public http: Http,
              private guard: AuthGuard,
              private service: UserService) {
  }

  error = false;

  ngOnInit(): void {
    if (this.guard.isUser()) {
      this.router.navigate(['/summary']);
    }
  }

  login(event, username, password): void {
    event.preventDefault();

    this.error = false;
    let body = {auth : { email: username, password: password } };
    this.http.post(environment.API_URL + 'user_token', body, { headers: contentHeaders })
      .subscribe(
        response => {
          localStorage.setItem('jwt', response.json().jwt);
          this.service.fetchUserFromAPI();
          this.router.navigate(['home']);
        },
        error => {
          this.error = true;
        }
      );
  }

  signup(event): void {
    event.preventDefault();
    this.router.navigate(['signup']);
  }
}
