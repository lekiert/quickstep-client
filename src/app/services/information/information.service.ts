import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { UserAction } from '../../user-action';
import { UserActionCollection } from '../../user-action-collection';
import { contentHeaders } from '../../common/headers';
import { BaseService } from '../base.service';

@Injectable()
export class InformationService extends BaseService {

  private page = 1;
  private size = 15;

  getLatestUserActionLogs(id?: any, page?: number) {
    if (!id) {
      return this.getUserActionLogsForThisUser(page);
    } else {
      return this.getUserActionLogsForSpecificUser(id, page);
    }
  }

  private getQueryParams(): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams();
    params.set('sort', '-id');
    params.set('page[number]', ''+this.page);
    params.set('page[size]', ''+this.size);

    return params;
  }

  private collectActions(logs: any): UserActionCollection {
    let batch = new UserActionCollection;

    try {
      let source = logs.json();
      let data = source.data;

      if (data) {
        let actions = data.map((log) => {
          return new UserAction(log.id, log.attributes);
        });

        batch.actions = actions;
        batch.meta = source.links;

        return batch;
      }
    } catch (e) {
      console.log('Failed to parse user stats');
    }

    return batch;
  }

  private getUserActionLogsForSpecificUser(id, page?: number): Promise<UserActionCollection> {
    let params = this.getQueryParams();
    if (page) {
      params.set('page[number]', ''+page);
    }

    let url = this.usersUrl + '/' + id + '/user-logs/';
    return this.authHttp.get(url, {
      search: params,
      headers: contentHeaders
    }).toPromise().then(this.collectActions)
  }

  private getUserActionLogsForThisUser(page?: number): Promise<UserActionCollection> {
    let params = this.getQueryParams();
    if (page) {
      params.set('page[number]', ''+page);
    }

    return this.authHttp.get(this.userLogsUrl, {
      search: params,
      headers: contentHeaders
    }).toPromise().then(this.collectActions)
  }
}
