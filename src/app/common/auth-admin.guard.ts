import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import {UserService} from "../services/user.service";
import {User} from "../user";

@Injectable()
export class AuthAdminGuard implements CanActivate {
    constructor(private service: UserService) {}

    isUser() {
        return tokenNotExpired(environment.TOKEN_NAME);
    }

    isGuest() {
        return !this.isUser();
    }

    canActivate(): boolean {
        if (this.isGuest()) {
            return false;
        }

        return this.service.isAuthenticatedAsAdmin();
    }
}
