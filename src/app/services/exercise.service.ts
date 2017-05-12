import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Exercise } from '../exercise';
import { contentHeaders } from '../common/headers';
import { BaseService } from './base.service';
import { ExercisePostDataService } from "./exercise-post-data.service";
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class ExerciseService extends BaseService {

  constructor(protected authHttp: AuthHttp,
              private postData: ExercisePostDataService) {
    super(authHttp);
  }

  getExercises(): Promise<Exercise[]> {
    let url = `${this.exercisesUrl}?sort=id`;
    return this.get(url).then(this.createExerciseFromResponse);
  }

  create(testId, exercise) {
    let url = `${this.testsUrl}/${testId}`;
    let data = this.postData.getCreateExercisePostData(exercise, testId);
    return this.post(url, data);
  }

  update(exercise: Exercise) {
    let url = `${this.exercisesUrl}/${exercise.id}`;
    let data = this.postData.getUpdateExercisePostData(exercise);
    return this.patch(url, data);
  }

  delete(exerciseId) {
    return this.delete(this.exercisesUrl + '/' + exerciseId).toPromise();
  }

  private createExerciseFromResponse(response: Response) {
    try {
      return response.json().data.map((item) => {
        return new Exercise(item.id, item.attributes);
      });
    } catch(e) {
      return null;
    }
  }
}
