import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {contentHeaders} from "../../common/headers";
import {AuthGuard} from "../../common/auth.guard";
import {UserService} from "../../services/user.service";
import {environment} from "../../../environments/environment";
import {getAuthenticatedUserId} from "../../common/helpers";
import {AuthService} from "../../services/auth.service";

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
    this.http.post(environment.API_URL + 'user_token', body, { headers: contentHeaders })
      .subscribe(
        response => {
          localStorage.setItem('jwt', response.json().jwt);
          this.userService.getUser(getAuthenticatedUserId()).then(user => {
            this.authService.setAuthenticatedUser(user);
            this.router.navigate(['home']);
          });
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
