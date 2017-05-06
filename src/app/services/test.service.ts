import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Test } from '../test';
import { Exercise } from '../exercise';
import { AuthHttp } from 'angular2-jwt';
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

  public getTestsByCourse(id): Promise<Test[]> {
    return this.authHttp.get(this.coursesUrl + '/' + id + '/tests' + '?sort=id', { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return data.map((item) => {
                   return new Test(item.id, item.attributes);
                 })
               });
  }

  public getTestsByCourseWithAnswers(id): Promise<Test[]> {
    return this.authHttp.get(this.coursesUrl + '/' + id + '/tests' + '?sort=id&include=answers', { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return data.map((item) => {
                   return new Test(item.id, item.attributes);
                 })
               });
  }

  public getUserAnswers(userId): any {
    return this.authHttp.get(this.usersUrl + '/' + userId + '/answers' + '?sort=-id', { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return data;
               });
  }

  public getAnswer(answersId): any {
    return this.authHttp.get(this.answersUrl + '/' + answersId + '?include=test,user', { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json();

                 return data;
               });
  }

  public getTest(id): Promise<Test> {
    return this.authHttp.get(this.testsUrl + '/' + id, { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return new Test(data.id, data.attributes);
               });
  }

  public getTestRelatedExercises(id): Promise<Exercise[]> {
    return this.authHttp.get(this.testsUrl + '/' + id + '/exercises' + '?sort=id', { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json().data;
                 return data.map((item) => {
                   return new Exercise(item.id, item.attributes);
                 })
               });
  }


  public createTest(test) {
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

  public createCourseTest(courseId, test) {
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

  public updateTest(test) {
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

  public createCourse(course) {
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

  public deleteTest(id): Promise<boolean> {
    return this.authHttp.delete(this.testsUrl + '/' + id).toPromise().then((response) => {
      return true;
    });
  }

  public updateCourse(course) {
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

  public submitAnswers(testId, userId, answers) {
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
