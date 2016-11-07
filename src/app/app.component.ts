import {Component} from '@angular/core';
import './rxjs-operators';
import { Router } from '@angular/router';
import { AuthGuard } from './common/auth.guard.ts';
import { tokenNotExpired } from 'angular2-jwt';

const grid   = require('./grid.scss');
const style   = require('./style.scss');

@Component({
  selector   : 'app',
  styles: [ grid, style ],
  templateUrl: './app.component.html',
})

export class AppComponent {

  constructor(public router: Router, public guard: AuthGuard) {

  }

  isUser() {
    return this.guard.isUser();
  }

  isGuest() {
    return !this.isUser();
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['login']);
  }
}
