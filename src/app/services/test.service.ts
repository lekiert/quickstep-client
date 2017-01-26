import { Injectable }             from '@angular/core';
import { Http, Headers, Response }         from '@angular/http';
import { Test }              from '../test';
import { Excercise }              from '../excercise';
import { Observable }             from 'rxjs/Observable';
import { AuthHttp }               from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { getAuthenticatedUserId } from '../common/helpers';
import { contentHeaders }         from '../common/headers';

@Injectable()
export class TestService {

  private testsUrl = environment.API_URL + 'tests';
  private coursesUrl = environment.API_URL + 'courses';
  private answersUrl = environment.API_URL + 'answers';

  constructor (private authHttp: AuthHttp) {}

  getTestsByCourse(id): Promise<Test[]> {
    return this.authHttp.get(this.coursesUrl + '/' + id + '/tests', { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return data.map((item) => {
                   return new Test(item.id, item.attributes);
                 })
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
