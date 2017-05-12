import { TestBed, inject } from '@angular/core/testing';

import { ExerciseFormService } from './exercise-form.service';

describe('ExerciseFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExerciseFormService]
    });
  });

  it('should ...', inject([ExerciseFormService], (service: ExerciseFormService) => {
    expect(service).toBeTruthy();
  }));
});
