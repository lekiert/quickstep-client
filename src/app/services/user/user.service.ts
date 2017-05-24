import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { getAuthenticatedUserId } from '../../common/helpers';
import { User } from '../../user';
import '../../rxjs-operators';
import { Subject }    from 'rxjs/Subject';
import { BaseService } from '../base.service';
import {UserPostDataService} from "./user-post-data.service";
import {AuthHttp} from "angular2-jwt";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';

@Injectable()
export class UserService extends BaseService {

  private user = new Subject<User>();

  constructor(
      protected authHttp: AuthHttp,
      private postData: UserPostDataService) {
    super(authHttp);
  }

  /**
   * Alias for getUserFromAPI
   * @param userId
   * @returns {Promise<User>}
   */
  public getUser(userId: number): Promise<User> {
    let url = `${this.usersUrl}/${userId}/`;
    return this.get(url).then(user => user).then(this.createUserFromResponse);
  }

  public getUserAsObservable(id?: number): Observable<User> {
    let userId = id || getAuthenticatedUserId();
    let url = `${this.usersUrl}/${userId}/`;
    return this.getObs(url).flatMap(
            (response) => {
              let user = this.createUserFromResponse(response);
              return Observable.of(user);
            }
        );
  }

  public getUsers(type?: string): Promise<User[]> {
    let filter = new URLSearchParams();

    if (type && type !== 'ALL') {
      filter.set('filter[role]', type);
    }

    return this.get(this.usersUrl).then(this.createUserListFromResponse);
  }

  public getUsersOfType(type: string): Promise<User[]> {
    return this.getUsers(type);
  }

  public getTeachers(): Promise<User[]> {
    return this.getUsersOfType('TEACHER');
  }

  public getUsersByGroup(id: number): Promise<User[]> {
    return this.getUsersOfTypeByGroup('users', id);
  }

  public getTeachersByGroup(id: number): Promise<User[]> {
    return this.getUsersOfTypeByGroup('teachers', id);
  }

  public getUsersOfTypeByGroup(type: string, id: number): Promise<User[]> {
    let url = `${this.groupsUrl}/${id}/${type}`;
    return this.get(url).then(this.createUserListFromResponse);
  }

  /**
   * Changing password of currently authenticated user. Usable by all account types.
   * @param oldPassword
   * @param newPassword
   * @returns {Promise<any>}
   */
  public changePassword(oldPassword: string, newPassword: string): Promise<any> {
    let userId = getAuthenticatedUserId();
    let url = `${this.usersUrl}/${userId}/password-updates`
    let data = this.postData.getPasswordChangePostData(userId, newPassword, oldPassword);
    return this.post(url, data);
  }

  /**
   * Changing specific user's password. Usable by Administrator, other accounts
   * have no such privileges.
   * @param userId
   * @param newPassword
   * @returns {Promise<any>}
   */
  public changeUserPassword(userId, newPassword: string): Promise<any> {
    let url = `${this.usersUrl}/${userId}/password-updates`;
    let data = this.postData.getPasswordChangePostData(userId, newPassword);
    return this.post(url, data);
  }

  public deleteUser(id): Promise<boolean> {
    let url = `${this.usersUrl}/${id}`;
    return this.delete(url).then(() => true).catch(() => false);
  }

  public createUser(user): Promise<any> {
    let data = this.postData.getCreateUserPostData(user);
    return this.post(this.usersUrl, data);
  }

  public updateUser(user: User): Promise<any> {
    let url = `${this.usersUrl}/${user.id}`;
    let data = this.postData.getUpdateUserPostData(user);
    return this.patch(url, data);
  }

  private createUserFromResponse(response): User {
    try {
      let id = response.json().data.id;
      let data = response.json().data.attributes;
      let user = new User(+id, data);

      return user;
    } catch(e) {
      console.log(e)
      return null;
    }
  }

  private createUserListFromResponse(response): User[] {
    try {
      let data = response.json().data;

      return data.map((item) => {
        return new User(+item.id, item.attributes);
      })
    } catch(e) {
      console.log(e);
      return [];
    }
  }
}
