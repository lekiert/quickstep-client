import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Exercise } from '../exercise';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { contentHeaders } from '../common/headers';
import { BaseService } from './base.service';

@Injectable()
export class ExerciseService extends BaseService {

  getExercises(): Promise<Exercise[]> {
    return this.authHttp.get(this.exercisesUrl + '?sort=id', { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return data.map((item) => {
                   return new Exercise(item.id, item.attributes);
                 })
               })
               .catch(this.handleError);
  }

  createTestExercise(testId, exercise) {
    return this.authHttp.post(this.testsUrl + '/' + testId + '/exercises', {
      data: {
        type: "exercises",
        attributes: {
          "name": exercise.name,
          "code": exercise.code,
          "command": exercise.command,
          "exercise-type": exercise.type,
          "data": exercise.data,
          "answers": exercise.answers,
          "status": 1,
          "test-id": testId,
        }
      }
    }, { headers: contentHeaders }).toPromise();
  }

  updateExercise(exercise) {
    return this.authHttp.patch(this.exercisesUrl + '/' + exercise.id, {
      data: {
        id: exercise.id,
        type: "exercises",
        attributes: {
          "name": exercise.name,
          "code": exercise.code,
          "command": exercise.command,
          "exercise-type": exercise.type,
          "data": exercise.data,
          "answers": exercise.answers,
          "status": 1,
          "test-id": exercise.testId
        }
      }
    }, { headers: contentHeaders }).toPromise();
  }

  deleteExercise(exerciseId) {
    return this.authHttp.delete(this.exercisesUrl + '/' + exerciseId).toPromise();
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }
}
