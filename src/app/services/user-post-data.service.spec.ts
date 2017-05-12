import { TestBed, inject } from '@angular/core/testing';

import { UserPostDataService } from './user-post-data.service';

describe('UserPostDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserPostDataService]
    });
  });

  it('should be created', inject([UserPostDataService], (service: UserPostDataService) => {
    expect(service).toBeTruthy();
  }));

  it('should set old password in the object when provided',
    inject([UserPostDataService], (service: UserPostDataService) => {
      let postData = this.service.getPasswordChangeData(1, 2, 3);
      expect(postData.attributes["old-password"]).toBeTruthy();
    }
  ));

  it('should not set old password in the object when not provided',
    inject([UserPostDataService], (service: UserPostDataService) => {
      let postData = this.service.getPasswordChangeData(1, 2, 3);
      expect(postData.attributes["old-password"]).toBeFalsy();
  }));
});
