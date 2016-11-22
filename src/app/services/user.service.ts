import { Injectable }             from '@angular/core';
import { Http, Response }         from '@angular/http';
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
}
