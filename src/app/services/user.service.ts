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

  private usersUrl = process.env.API_URL + 'users';  // URL to web API

  constructor (private authHttp: AuthHttp) {}

  isAuthenticated(): boolean {
    return !!getAuthenticatedUserId();
  }

  getAuthenticatedUser(): Observable<User> {
    return this.subject.asObservable();
  }

  fetchUserFromAPI() {
    let userId = getAuthenticatedUserId();
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
}
