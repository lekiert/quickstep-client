import { Injectable }             from '@angular/core';
import { Http, Headers, Response }         from '@angular/http';
import { Excercise }              from '../excercise';
import { Observable }             from 'rxjs/Observable';
import { AuthHttp }               from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { contentHeaders }         from '../common/headers';

@Injectable()
export class ExcerciseService {

  private excercisesUrl = environment.API_URL + 'excercises';  // URL to web API
  private testsUrl = environment.API_URL + 'tests';  // URL to web API

  constructor (private authHttp: AuthHttp) {}

  getExcercises(): Promise<Excercise[]> {
    return this.authHttp.get(this.excercisesUrl)
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return data.map((item) => {
                   return new Excercise(item.id, item.attributes);
                 })
               })
               .catch(this.handleError);
  }

  createTestExcercise(testId, excercise) {
    return this.authHttp.post(this.testsUrl + '/' + testId + '/excercises', {
      data: {
        type: "excercises",
        attributes: {
          "name": excercise.name,
          "code": excercise.code,
          "command": excercise.command,
          "excercise-type": excercise.type,
          "data": excercise.data,
          "answers": excercise.answers,
          "status": 1,
          "test-id": testId,
        }
      }
    }, { headers: contentHeaders }).toPromise();
  }

  updateExcercise(excercise) {
    console.log(excercise);
    return this.authHttp.patch(this.excercisesUrl + '/' + excercise.id, {
      data: {
        id: excercise.id,
        type: "excercises",
        attributes: {
          "name": excercise.name,
          "code": excercise.code,
          "command": excercise.command,
          "excercise-type": excercise.type,
          "data": excercise.data,
          "answers": excercise.answers,
          "status": 1,
          "test-id": excercise.testId
        }
      }
    }, { headers: contentHeaders }).toPromise();
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
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
}
