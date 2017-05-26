import { TestBed, inject } from '@angular/core/testing';

import { ExercisePostDataService } from './exercise-post-data.service';
import {Exercise} from "../../exercise";

describe('ExercisePostDataService', () => {

  let service: ExercisePostDataService;

  let testExerciseData = {
    name: 'test name',
    command: 'test command',
    type: 'type',
    data: {},
    answers: {},
    status: 1,
    testId: 1,
    pointFactor: 1,
  }

  let testExercise: Exercise = new Exercise(1, {
    attributes: testExerciseData
  });

  beforeEach(() => {
    service = new ExercisePostDataService;
  });

  it('should create an instance', () => {
    expect(service).toBeDefined();
  });

  it('getCreateExercisePostData should create a valid structure', () => {
    let postData = service.getCreateExercisePostData(testExerciseData, 1);

    expect(postData.data).toBeDefined();
    expect(postData.data.attributes).toBeDefined();
    expect(postData.data.type).toBeDefined();
  });

  it('getUpdateExercisePostData should create a valid structure', () => {
    let postData = service.getUpdateExercisePostData(testExercise);

    expect(postData.data).toBeDefined();
    expect(postData.data.attributes).toBeDefined();
    expect(postData.data.type).toBeDefined();
    expect(postData.data.id).toBeDefined();
  });
});
