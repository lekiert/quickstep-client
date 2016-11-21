import { Injectable }             from '@angular/core';
import { Http, Response }         from '@angular/http';
import { Observable }             from 'rxjs/Observable';
import { AuthHttp, JwtHelper }    from 'angular2-jwt';
import { getAuthenticatedUserId } from '../common/helpers';
import { User }                   from '../user';
import { contentHeaders }         from '../common/headers';

@Injectable()
export class UserService {

  private usersUrl = process.env.API_URL + 'users';  // URL to web API

  constructor (private authHttp: AuthHttp) {}

  getAuthenticatedUser(): Promise<User> {
    let userId = getAuthenticatedUserId();
    return this.authHttp.get(this.usersUrl + '/' + userId + '/')
                        .toPromise().then((response) => {
                          let id = response.json().data.id;
                          let data = response.json().data.attributes;
                          return new User(id, data);
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
}
