import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {AuthGuard} from "../../common/auth.guard";
import {UserService} from "../../services/user/user.service";
import {AuthService} from "../../services/auth/auth.service";

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
              private authService: AuthService,
              private userService: UserService) {
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
    this.authService.authenticateUser(body).subscribe(
        () => { this.router.navigate(['home']) },
        () => { this.error = true }
    );
  }
}
