import { Injectable } from '@angular/core';
import { Test } from '../../test';
import { Exercise } from '../../exercise';
import { contentHeaders } from '../../common/headers';
import { BaseService } from '../base.service';

@Injectable()
export class TestService extends BaseService {

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

  public deleteTest(id): Promise<boolean> {
    return this.authHttp.delete(this.testsUrl + '/' + id).toPromise().then((response) => {
      return true;
    });
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
