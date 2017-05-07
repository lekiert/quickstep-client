import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { URLSearchParams } from "@angular/http";
import { contentHeaders } from '../common/headers';
import { AuthHttp } from 'angular2-jwt';
import { Answer } from 'app/answer';

@Injectable()
export class AnswerService extends BaseService {

  private page = 1;
  private size = 15;

  private getQueryParams(): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams();
    params.set('sort', 'id');
    params.set('page[number]', ''+this.page);
    params.set('page[size]', ''+this.size);

    return params;
  }

  private collectAnswers(logs: any): Array<Answer> {
    try {
      let data = logs.json().data;

      if (data) {
        return data.map((log) => {
          return new Answer(log.id, log.attributes);
        });
      }
    } catch (e) {
      console.log('Failed to parse user answers');
    }

    return [];
  }

  getAnswerStats(userId?: any, page?: number): Promise<any> {
    let url = this.answersUrl;
    let params = this.getQueryParams();
    if (userId) {
      url = this.usersUrl + '/' + userId + '/answers/';
    }

    if (page) {
      params.set('page[number]', ''+page);
    }

    return this.authHttp.get(url, {
      search: this.getQueryParams(),
      headers: contentHeaders
    }).toPromise().then(this.collectAnswers);
  }

}
