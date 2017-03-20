import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { UserAction } from '../user-action';
import { contentHeaders } from '../common/headers';
import { BaseService } from './base.service';
import { HttpModule } from "@angular/http";

@Injectable()
export class InformationService extends BaseService {

  private page = 1;
  private size = 15;

  constructor (private authHttp: AuthHttp) {
    super()
  }

  getLatestUserActionLogs(id?: any) {
    if (!id) {
      return this.getUserActionLogsForThisUser();
    } else {
      return this.getUserActionLogsForSpecificUser(id);
    }
  }

  private getUserActionLogsForSpecificUser(id) {
    return this.authHttp.get(this.usersUrl + '/' + id + '/user-logs/' + '?sort=-id&page%5Bnumber%5D=' + this.page + '&page%5Bsize%5D=' + this.size, { headers: contentHeaders }).toPromise().then((logs) => {
      let data = logs.json().data;

      if (data) {
        return data.map((log) => {
          return new UserAction(log.id, log.attributes);
        });
      }

      return [];
    })
  }

  private getUserActionLogsForThisUser() {
    return this.authHttp.get(this.userLogsUrl + '?sort=-id&page%5Bnumber%5D=' + this.page + '&page%5Bsize%5D=' + this.size, { headers: contentHeaders }).toPromise().then((logs) => {
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
