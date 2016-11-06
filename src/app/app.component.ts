import {Component} from '@angular/core';
import './rxjs-operators';
import { Router } from '@angular/router';

const grid   = require('./grid.scss');
const style   = require('./style.scss');

@Component({
  selector   : 'app',
  styles: [ grid, style ],
  templateUrl: './app.component.html',
})

export class AppComponent {

  constructor(public router: Router) {
    
  }

  isUser() {
    if (localStorage.getItem('jwt')) {
      return true;
    }
  }

  isGuest() {
    return !this.isUser();
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['login']);
  }
}
