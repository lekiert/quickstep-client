import { Injectable }             from '@angular/core';
import { Http, Headers, Response }         from '@angular/http';
import { Course }              from '../course';
import { Observable }             from 'rxjs/Observable';
import { AuthHttp }               from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { contentHeaders }         from '../common/headers';

@Injectable()
export class CourseService {

  private coursesUrl = environment.API_URL + 'courses';  // URL to web API
  private usersUrl = environment.API_URL + 'users';  // URL to web API

  constructor (private authHttp: AuthHttp) {}

  getCourses(): Promise<Course[]> {

    return this.authHttp.get(this.coursesUrl, { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return data.map((item) => {
                   return new Course(item.id, item.attributes);
                 })
               })
               .catch(this.handleError);
  }

  getCoursesByUser(id): Promise<Course[]> {
    return this.authHttp.get(this.usersUrl + '/' + id + '/courses', { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return data.map((item) => {
                   return new Course(item.id, item.attributes);
                 })
               })
               .catch(this.handleError);
  }

  getUserCourses(id): Promise<Course[]> {
    return this.authHttp.get(this.usersUrl + '/' + id + '/groups?include=courses', { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json();
                 if (data.included) {
                   return data.included.map((item) => {
                     return new Course(item.id, item.attributes);
                   })
                 }

                 return [];
               })
               .catch(this.handleError);
  }

  getCourse(id: number): Promise<Course> {
    return this.authHttp.get(this.coursesUrl + '/' + id, { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json().data;
                 return new Course(data.id, data.attributes);
               })
               .catch(this.handleError);
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
