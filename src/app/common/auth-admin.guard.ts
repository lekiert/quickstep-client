import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import {UserService} from "../services/user.service";
import {User} from "../user";

@Injectable()
export class AuthAdminGuard implements CanActivate {
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

    canActivate(): Promise<boolean> {
        if (this.isGuest()) {
            return new Promise(resolve => resolve(false));
        }

        let promise = new Promise((resolve, reject) => {
            return this.userService.getAuthenticatedUserObject().then((user: User) => {
                if (user.isAdmin()) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });

        return promise;
    }
}
