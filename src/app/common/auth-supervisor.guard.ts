import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import {UserService} from "../services/user.service";

@Injectable()
export class AuthSupervisorGuard implements CanActivate {
    constructor(private userService: UserService) {}

    isUser() {
        if (tokenNotExpired(environment.TOKEN_NAME)) {
            return true;
        }

        return false;
    }

    isGuest() {
        return !this.isUser();
    }

    canActivate(): any {
        if (this.isGuest()) {
            return false;
        }

        return this.userService.getAuthenticatedUserObject().then((user) => user.isAdmin() || user.isSupervisor());
    }
}
