import { TestBed, inject } from '@angular/core/testing';

import { ExercisePostDataService } from './exercise-post-data.service';

describe('ExercisePostDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExercisePostDataService]
    });
  });

  it('should ...', inject([ExercisePostDataService], (service: ExercisePostDataService) => {
    expect(service).toBeTruthy();
  }));
});
