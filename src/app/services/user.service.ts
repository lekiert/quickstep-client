import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { getAuthenticatedUserId } from '../common/helpers';
import { User } from '../user';
import { contentHeaders } from '../common/headers';
import '../rxjs-operators';
import { Subject }    from 'rxjs/Subject';
import { BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService {

  private subject = new Subject<User>();

  private authenticatedUser: User;

  constructor (private authHttp: AuthHttp) {
    super()
  }

  public isAuthenticated(): boolean {
    return !!getAuthenticatedUserId();
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
    this.subject.next(user);
  }

  public getAuthenticatedUserObject(): Promise<User> {
    if (this.authenticatedUser) {
      return new Promise((resolve) => resolve(this.authenticatedUser));
    }

    return this.getUser(getAuthenticatedUserId()).then(user => {
      this.setAuthenticatedUser(user);
      return this.authenticatedUser;
    });
  }

  public getUser(userId: number): Promise<User> {
    return this.getUserFromAPI(userId);
  }

  public getUserFromAPI(userId: number): Promise<User> {
    return this.authHttp.get(this.usersUrl + '/' + userId + '/', { headers: contentHeaders })
        .toPromise().then(user => user).then((response) => this.createUserFromResponse(response));
  }

  public getUserObservable() {
    return this.subject.asObservable();
  }

  public fetchUserFromAPI(id?: number) {
    let userId = id || getAuthenticatedUserId();
    return this.authHttp.get(this.usersUrl + '/' + userId + '/', { headers: contentHeaders })
                        .subscribe(
                          (response) => {
                            let id = response.json().data.id;
                            let data = response.json().data.attributes;
                            let user = new User(id, data);
                            this.subject.next(user);
                            return user;
                          },
                          (error) => { console.log(error) }
                        );
  }

  public getUsers(type?: string): Promise<User[]> {
    let filter = new URLSearchParams();

    if (type && type !== 'ALL') {
      filter.set('filter[role]', type);
    }

    return this.authHttp.get(this.usersUrl, { search: filter, headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return data.map((item) => {
                   return new User(item.id, item.attributes);
                 })
               });
  }

  public getTeachers(): Promise<User[]> {
    return this.getUsers('TEACHER');
  }

  public getUsersByGroup(id: number): Promise<User[]> {
    return this.getUsersOfTypeByGroup('users', id);
  }

  public getTeachersByGroup(id: number): Promise<User[]> {
    return this.getUsersOfTypeByGroup('teachers', id);
  }

  public getUsersOfTypeByGroup(type: string, id: number): Promise<User[]> {
    return this.authHttp.get(this.groupsUrl + '/' + id + '/' + type, { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return data.map((item) => {
                   return new User(item.id, item.attributes);
                 })
               });
  }

  public changePassword(oldPassword: string, newPassword: string) {
    let userId = getAuthenticatedUserId();
    return this.authHttp.post(this.usersUrl + '/' + userId + '/password-updates', {
      data: {
        type: "password-updates",
        attributes: {
          "user-id": userId,
          "old-password": oldPassword,
          "new-password": newPassword
        }
      }
    }, { headers: contentHeaders }).toPromise();
  }

  public changeUserPassword(userId, newPassword: string) {
    return this.authHttp.post(this.usersUrl + '/' + userId + '/password-updates', {
      data: {
        type: "password-updates",
        attributes: {
          "user-id": userId,
          "new-password": newPassword
        }
      }
    }, { headers: contentHeaders }).toPromise();
  }

  public deleteUser(id): Promise<boolean> {
    return this.authHttp.delete(this.usersUrl + '/' + id, { headers: contentHeaders }).toPromise().then((response) => {
      return true;
    });
  }

  public createUser(user) {
    let userId = getAuthenticatedUserId();
    return this.authHttp.post(this.usersUrl, {
      data: {
        type: "users",
        attributes: {
          "first-name": user.first_name,
          "last-name": user.last_name,
          "password": user.password,
          "email": user.email,
          "role": user.role
        }
      }
    }, { headers: contentHeaders }).toPromise();
  }

  public updateUser(user) {
    return this.authHttp.patch(this.usersUrl + '/' + user.id, {
      data: {
        id: user.id,
        type: "users",
        attributes: {
          "first-name": user.first_name,
          "last-name": user.last_name,
          "email": user.email,
          "role": user.role
        }
      }
    }, { headers: contentHeaders }).toPromise();
  }

  private createUserFromResponse(response, cache: boolean = true): User {

    let id = response.json().data.id;
    let data = response.json().data.attributes;
    let user = new User(id, data);

    return user;
  }
}
