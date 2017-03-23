import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Test } from '../test';
import { Excercise } from '../excercise';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { getAuthenticatedUserId } from '../common/helpers';
import { contentHeaders } from '../common/headers';
import { BaseService } from './base.service';

@Injectable()
export class TestService extends BaseService {

  constructor (
      private authHttp: AuthHttp,
      private http: Http
  ) {
    super()
  }

  getTestsByCourse(id): Promise<Test[]> {
    return this.authHttp.get(this.coursesUrl + '/' + id + '/tests' + '?sort=id', { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return data.map((item) => {
                   return new Test(item.id, item.attributes);
                 })
               });
  }

  getTestsByCourseWithAnswers(id): Promise<Test[]> {
    return this.authHttp.get(this.coursesUrl + '/' + id + '/tests' + '?sort=id&include=answers', { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return data.map((item) => {
                   return new Test(item.id, item.attributes);
                 })
               });
  }

  getUserAnswers(userId): any {
    return this.authHttp.get(this.usersUrl + '/' + userId + '/answers' + '?sort=-id', { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return data;
               });
  }

  getAnswer(answersId): any {
    return this.authHttp.get(this.answersUrl + '/' + answersId + '?include=test,user', { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json();

                 return data;
               });
  }

  getTest(id): Promise<Test> {
    return this.authHttp.get(this.testsUrl + '/' + id, { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return new Test(data.id, data.attributes);
               });
  }

  getTestRelatedExcercises(id): Promise<Excercise[]> {
    return this.authHttp.get(this.testsUrl + '/' + id + '/excercises' + '?sort=id', { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json().data;
                 return data.map((item) => {
                   return new Excercise(item.id, item.attributes);
                 })
               });
  }


  createTest(test) {
    return this.authHttp.post(this.testsUrl, {
      data: {
        id: test.id,
        type: "tests",
        attributes: {
          "name": test.name,
          "code": test.code,
          "description": test.description,
        }
      }
    }, { headers: contentHeaders }).toPromise();
  }

  createCourseTest(courseId, test) {
    return this.authHttp.post(this.testsUrl, {
      data: {
        id: test.id,
        type: "tests",
        attributes: {
          "name": test.name,
          "code": test.code,
          "description": test.description,
        }
      }
    }, { headers: contentHeaders }).toPromise().then((test) => {
      console.log(test.json());
      let result = test.json();
      return this.authHttp.post(this.coursesUrl + '/' + courseId + '/relationships/tests', {
        data: [
          { type: "tests", id: result.data.id }
        ]
      }, { headers: contentHeaders }).toPromise();
    });
  }

  updateTest(test) {
    console.log('update');
    console.log(test);
    return this.authHttp.patch(this.testsUrl + '/' + test.id, {
      data: {
        id: test.id,
        type: "tests",
        attributes: {
          "name": test.name,
          "code": test.code,
          "description": test.description,
        }
      }
    }, { headers: contentHeaders }).toPromise();
  }

  createCourse(course) {
    return this.authHttp.post(this.coursesUrl, {
      data: {
        type: "courses",
        attributes: {
          "name": course.name,
          "description": course.description
        }
      }
    }, { headers: contentHeaders }).toPromise();
  }

  deleteTest(id): Promise<boolean> {
    return this.authHttp.delete(this.testsUrl + '/' + id).toPromise().then((response) => {
      return true;
    });
  }

  updateCourse(course) {
    return this.authHttp.patch(this.coursesUrl + '/' + course.id, {
      data: {
        id: course.id,
        type: "courses",
        attributes: {
          "name": course.name,
          "description": course.description
        }
      }
    }, { headers: contentHeaders }).toPromise();
  }

  submitAnswers(testId, userId, answers) {
    return this.authHttp.post(this.answersUrl, {
      data: {
        type: "answers",
        attributes: {
          "answers": answers
        },
        relationships: {
          test : {
            data: {
              type: "tests", id: testId
            }
          },
          user : {
            data: {
              type: "users", id: userId
            }
          }
        }
      }
    }, { headers: contentHeaders }).toPromise();
  }
}
