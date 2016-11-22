import { Injectable }             from '@angular/core';
import { Http, Headers, Response }         from '@angular/http';
import { Test }              from '../test';
import { Excercise }              from '../excercise';
import { Observable }             from 'rxjs/Observable';
import { AuthHttp }               from 'angular2-jwt';

@Injectable()
export class TestService {

  private testsUrl = process.env.API_URL + 'tests';
  private coursesUrl = process.env.API_URL + 'courses';

  constructor (private authHttp: AuthHttp) {}

  getTestsByCourse(id): Promise<Test[]> {
    return this.authHttp.get(this.coursesUrl + '/' + id + '/tests')
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return data.map((item) => {
                   return new Test(item.id, item.attributes);
                 })
               });
  }

  getTest(id): Promise<Test> {
    return this.authHttp.get(this.testsUrl + '/' + id)
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return new Test(data.id, data.attributes);
               });
  }

  getTestRelatedExcercises(id): Promise<Excercise[]> {
    return this.authHttp.get(this.testsUrl + '/' + id + '/excercises')
               .toPromise()
               .then((response) => {
                 let data = response.json().data;
                 return data.map((item) => {
                   return new Excercise(item.id, item.attributes);
                 })
               });
  }
}
