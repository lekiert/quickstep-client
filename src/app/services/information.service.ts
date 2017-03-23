import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { UserAction } from '../user-action';
import { contentHeaders } from '../common/headers';
import { BaseService } from './base.service';

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

  private getQueryParams(): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams();
    params.set('sort', '-id');
    params.set('page[number]', ''+this.page);
    params.set('page[size]', ''+this.size);

    return params;
  }

  private collectActions(logs: any): Array<UserAction> {
    try {
      let data = logs.json().data;

      if (data) {
        return data.map((log) => {
          return new UserAction(log.id, log.attributes);
        });
      }
    } catch (e) {
      console.log('Failed to parse user stats');
    }

    return [];
  }

  private getUserActionLogsForSpecificUser(id): Promise<Array<UserAction>> {
    let url = this.usersUrl + '/' + id + '/user-logs/';
    return this.authHttp.get(url, {
      search: this.getQueryParams(),
      headers: contentHeaders
    }).toPromise().then(this.collectActions)
  }

  private getUserActionLogsForThisUser() {
    return this.authHttp.get(this.userLogsUrl, {
      search: this.getQueryParams(),
      headers: contentHeaders
    }).toPromise().then(this.collectActions)
  }
}
