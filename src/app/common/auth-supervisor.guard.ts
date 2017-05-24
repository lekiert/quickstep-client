import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from 'environments/environment';
import { AuthService } from "app/services/auth/auth.service";

@Injectable()
export class AuthSupervisorGuard implements CanActivate {
    constructor(private authService: AuthService) {}

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

        return this.authService.isAuthenticatedAsSupervisor();
    }
}
