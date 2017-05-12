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
      let postData = service.getPasswordChangePostData(1, 2, 3);
      console.log(postData);
      expect(postData['data']).toBeTruthy();
      expect(postData['data'].attributes["old-password"]).toBeTruthy();
    }
  ));

  it('should not set old password in the object when not provided',
    inject([UserPostDataService], (service: UserPostDataService) => {
      let postData = service.getPasswordChangePostData(1, 2);
      expect(postData['data'].attributes["old-password"]).toBeFalsy();
  }));
});
