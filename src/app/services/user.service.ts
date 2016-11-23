import { Injectable }             from '@angular/core';
import { Http, Response, URLSearchParams }         from '@angular/http';
import { Observable }             from 'rxjs/Observable';
import { AuthHttp, JwtHelper }    from 'angular2-jwt';
import { getAuthenticatedUserId } from '../common/helpers';
import { User }                   from '../user';
import { contentHeaders }         from '../common/headers';
import '../rxjs-operators';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class UserService {

  private user: User;
  private subject = new Subject<User>();

  private usersUrl = process.env.API_URL + 'users';
  private groupsUrl = process.env.API_URL + 'groups';

  constructor (private authHttp: AuthHttp) {}

  isAuthenticated(): boolean {
    return !!getAuthenticatedUserId();
  }

  getAuthenticatedUser(): Observable<User> {
    return this.subject.asObservable();
  }

  getUser(userId: number): Promise<User> {
    return this.authHttp.get(this.usersUrl + '/' + userId + '/')
                        .toPromise()
                        .then((response) => {
                          let id = response.json().data.id;
                          let data = response.json().data.attributes;
                          let user = new User(id, data);
                          return user;
                        });
  }

  fetchUserFromAPI(id?: number) {
    let userId = id || getAuthenticatedUserId();
    return this.authHttp.get(this.usersUrl + '/' + userId + '/')
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

  deleteUser(id): Promise<boolean> {
    return this.authHttp.delete(this.usersUrl + '/' + id).toPromise().then((response) => {
      return true;
    });
  }

  getUsers(type?: string): Promise<User[]> {

    let filter = new URLSearchParams();

    if (type && type !== 'ALL') {
      filter.set('filter[role]', type);
    }

    return this.authHttp.get(this.usersUrl, { search: filter })
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return data.map((item) => {
                   return new User(item.id, item.attributes);
                 })
               });
  }

  getUsersByGroup(id: number): Promise<User[]> {
    return this.authHttp.get(this.groupsUrl + '/' + id + '/users')
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return data.map((item) => {
                   return new User(item.id, item.attributes);
                 })
               });
  }

  changePassword(oldPassword: string, newPassword: string) {
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

  createUser(user) {
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

  updateUser(user) {
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
}
