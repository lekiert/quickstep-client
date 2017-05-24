import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthHttp } from 'angular2-jwt';
import { contentHeaders } from '../common/headers';
import { URLSearchParams, Response } from '@angular/http';
import { Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export abstract class BaseService {

  constructor (protected authHttp: AuthHttp) {}

  protected coursesUrl = environment.API_URL + 'courses';
  protected usersUrl = environment.API_URL + 'users';
  protected teachersUrl = environment.API_URL + 'teachers';
  protected groupsUrl = environment.API_URL + 'groups';
  protected exercisesUrl = environment.API_URL + 'exercises';
  protected testsUrl = environment.API_URL + 'tests';
  protected userLogsUrl = environment.API_URL + 'user-logs';
  protected answersUrl = environment.API_URL + 'answers';

  protected getHeaders() {
    return contentHeaders;
  }

  protected get(url, headers?: Object, query?: URLSearchParams): Promise<any> {
    headers = headers || {};
    query = query || new URLSearchParams();

    return this.authHttp.get(url, {
      search: query,
      headers: this.makeHeaders(headers)
    }).toPromise();
  }

  protected getObs(url, headers?: Object, query?: URLSearchParams): Observable<any> {
    headers = headers || {};
    query = query || new URLSearchParams();

    return this.authHttp.get(url, {
      search: query,
      headers: this.makeHeaders(headers)
    });
  }

  protected post(url, data: Object, headers?: Object): Promise<any> {
    headers = headers || {};

    return this.authHttp.post(url, data, {
      headers: this.makeHeaders(headers)
    }).toPromise();
  }

  protected patch(url, data: Object, headers?: Object): Promise<any> {
    headers = headers || {};

    return this.authHttp.patch(url, data, {
      headers: this.makeHeaders(headers)
    }).toPromise();
  }

  protected delete(url): Promise<any> {
    return this.authHttp.delete(url, {
      headers: contentHeaders
    }).toPromise();
  }

  protected handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private makeHeaders(headers: Object): Headers {
    let result = contentHeaders;
    for (let header in headers) {
      result.append = headers[header];
    }

    return result;
  }
}
