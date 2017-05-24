import { Injectable } from '@angular/core';
import {Exercise} from "../../exercise";

@Injectable()
export class ExercisePostDataService {

  public getCreateExercisePostData(exercise, testId) {
    return {
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
    }
  }

  public getUpdateExercisePostData(exercise: Exercise) {
    return {
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
    }
  }

}
