import { Component } from '@angular/core';
import './rxjs-operators';
import { Router } from '@angular/router';
import { AuthGuard } from './common/auth.guard';
import { UserService } from './services/user.service';
import { User } from './user';
import {AuthService} from "./services/auth.service";

const grid   = require('./grid.scss');
const style   = require('./style.scss');

@Component({
  selector   : 'app',
  styles: [ grid, style ],
  templateUrl: './app.component.html',
})

export class AppComponent {

  user: any;

  constructor(public router: Router,
              public guard: AuthGuard,
              private service: AuthService) {}

  ngOnInit() {
    this.service.fetchUserFromAPI().subscribe(user => this.user = user);
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
