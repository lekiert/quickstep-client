import { Injectable } from '@angular/core';
import {ExerciseService} from "app/services/exercise.service";
import {AuthHttp} from "angular2-jwt";
import {environment} from "environments/environment";
import {contentHeaders} from "app/common/headers";
import {Subject} from "rxjs/Subject";
import {Exercise} from "../../../../exercise";

@Injectable()
export class ExerciseFormService {

  constructor(
      private http: AuthHttp,
  ) { }

  public makeBlankExercise(type?: string, testId?: number): Exercise {
    let exercise = new Exercise(null, {});
    exercise.testId = testId || '';
    exercise.name = '';
    exercise.command = '';
    exercise.code = '';
    exercise.type = type || '';
    exercise.data = {};
    exercise.answers = {};
    exercise.attachments = [];

    return exercise;
  }

  attachFile(file, exerciseId) {
    return this.http.post(environment.API_URL + 'exercises' + '/' + exerciseId + '/relationships/storage-files',
        {
          data: [
            { type: "storage-files", id: file.id }
          ]
        }, { headers: contentHeaders }
    ).toPromise().then(() => {
      return true;
    });
  }

  deleteFile(id: number) {
    return this.http.delete(environment.API_URL + 'storage-files/' + id, { headers: contentHeaders }
    ).toPromise().then(() => {
      return true;
    });
  }
}
