import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {User} from "../../user";
import {AuthHttp} from "angular2-jwt";
import {BaseService} from "../base.service";
import {getAuthenticatedUserId} from "../../common/helpers";
import {UserService} from "../user/user.service";
import {Observable} from "rxjs/Observable";
import { environment } from 'environments/environment';
import {Http} from "@angular/http";
import {contentHeaders} from "../../common/headers";


@Injectable()
export class AuthService extends BaseService {

  private user$ = new Subject<User>();
  private authenticatedUser: User;

  constructor(
      protected authHttp: AuthHttp,
      protected http: Http,
      protected userService: UserService) {
    super(authHttp);
  }

  public isAuthenticatedAsAdmin(): boolean {
    if (this.authenticatedUser) {
      return this.authenticatedUser.isAdmin();
    }

    return false
  }

  public isAuthenticatedAsSupervisor(): boolean {
    if (this.authenticatedUser) {
      return this.authenticatedUser.isAdmin() || this.authenticatedUser.isSupervisor();
    }

    return false
  }

  public setAuthenticatedUser(user: User) {
    this.authenticatedUser = user;
    this.user$.next(user);
  }

  public getAuthenticatedUser(): Promise<User> {
    if (this.authenticatedUser) {
      return new Promise((resolve) => resolve(this.authenticatedUser));
    }

    return this.userService.getUser(getAuthenticatedUserId()).then(user => {
      this.setAuthenticatedUser(user);
      return this.authenticatedUser;
    });
  }

  public getUserAsObservable(id?: number): Observable<User> {
    this.userService.getUserAsObservable(id).subscribe(
        user => { this.user$.next(user) },
        error => console.log(error)
    );
    return this.user$;
  }

  public authenticateUser(body): Observable<any> {
    let url = `${environment.API_URL}user_token`;
    return this.http.post(url, body, { headers: contentHeaders })
        .flatMap(
            response => {
              localStorage.setItem('jwt', response.json().jwt);
              return this.userService.getUser(getAuthenticatedUserId()).then(user => {
                this.setAuthenticatedUser(user);
                return Observable.of(user);
              });
            },
            error => error
        );
  }

  public logout(): void {
    localStorage.removeItem('jwt');
  }
}
