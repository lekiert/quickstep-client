import { Component } from '@angular/core';
import './rxjs-operators';
import { Router } from '@angular/router';
import { AuthGuard } from './common/auth.guard';
import { UserService } from './services/user.service';
import { User } from './user';

const grid   = require('./grid.scss');
const style   = require('./style.scss');

@Component({
  selector   : 'app',
  styles: [ grid, style ],
  templateUrl: './app.component.html',
})

export class AppComponent {

  user: User;

  constructor(public router: Router,
              public guard: AuthGuard,
              private service: UserService) {
                  this.service.getUserObservable().subscribe(
                      user => this.user = user,
                      error => console.log(error)
                  )
              }

  isUser(): boolean {
    return this.guard.isUser();
  }

  logout(): void {
    delete this.user;
    localStorage.removeItem('jwt');
    this.router.navigate(['login']);
  }
}
