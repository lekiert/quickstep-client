import { Component, OnInit } from '@angular/core';
import './rxjs-operators';
import { Router } from '@angular/router';
import { AuthGuard } from './common/auth.guard';
import { UserService } from './services/user.service';
import { tokenNotExpired } from 'angular2-jwt';
import { User } from './user';
import { Subscription }   from 'rxjs/Subscription';

const grid   = require('./grid.scss');
const style   = require('./style.scss');

@Component({
  selector   : 'app',
  styles: [ grid, style ],
  templateUrl: './app.component.html',
})

export class AppComponent {

  user: User;
  authenticatedUserId: number;
  subscription: Subscription;

  constructor(public router: Router,
              public guard: AuthGuard,
              private service: UserService) {
                this.service.fetchUserFromAPI();
                this.service.getAuthenticatedUser().subscribe(
                  user => {
                    this.user = user
                  },
                  error => {
                    console.log(error)
                  }
                )
              }

  isUser(): boolean {
    return this.guard.isUser();
  }

  isGuest(): boolean {
    return !this.isUser();
  }

  logout(): void {
    delete this.user;
    localStorage.removeItem('jwt');
    this.router.navigate(['login']);
  }
}
