import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelper } from 'angular2-jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  isUser() {
    if (tokenNotExpired(process.env.TOKEN_NAME)) {
        return true;
    }

    return false;
  }

  isGuest() {
    return !this.isUser();
  }

  canActivate() {
    if (this.isGuest()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
