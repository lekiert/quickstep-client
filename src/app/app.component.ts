import { Component } from '@angular/core';
import './rxjs-operators';
import { Router } from '@angular/router';
import { AuthGuard } from './common/auth.guard';
import { UserService } from './services/user/user.service';
import { User } from './user';
import {AuthService} from "./services/auth/auth.service";

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
              private service: AuthService) {}

  ngOnInit() {
    this.service.getUserAsObservable().subscribe(user => this.user = user);
  }

  isUser(): boolean {
    return this.guard.isUser();
  }

  logout(): void {
    delete this.user;
    this.service.logout();
    this.router.navigate(['login']);
  }
}
