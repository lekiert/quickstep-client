import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { UserAction } from '../user-action';
import { contentHeaders }         from '../common/headers';

@Injectable()
export class InformationService {

  private userLogsUrl = environment.API_URL + 'user-logs';  // URL to web API

  constructor (private authHttp: AuthHttp) {}

  getLatestUserActionLogs() {
    return this.authHttp.get(this.userLogsUrl + '?include=user', { headers: contentHeaders }).toPromise().then((logs) => {
      let data = logs.json().data;

      if (data) {
        return data.map((log) => {
          return new UserAction(log.id, log.attributes);
        });
      }

      return [];
    })
  }

}
