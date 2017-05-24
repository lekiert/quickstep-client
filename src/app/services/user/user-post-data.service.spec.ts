import {TestBed, inject} from '@angular/core/testing';

import {UserPostDataService} from './user-post-data.service';
import {User} from "../../user";

describe('UserPostDataService', () => {

    let service: UserPostDataService;

    beforeEach(() => {
        service = new UserPostDataService;
    });

    it('should set old password in the object when provided', () => {
        let postData = service.getPasswordChangePostData(1, 2, 3);
        console.log(postData);
        expect(postData['data']).toBeTruthy();
        expect(postData['data'].attributes["old-password"]).toBeTruthy();
    });

    it('should not set old password in the object when not provided', () => {
        let postData = service.getPasswordChangePostData(1, 2);
        expect(postData['data'].attributes["old-password"]).toBeFalsy();
    });

    it('creates a proper structure for update action', () => {
        let user = new User(1, {
            "first-name": 'test1',
            "last-name": 'test2',
            "role": 'role',
            "email": 'test@test.dev'
        });


        let postData = service.getUpdateUserPostData(user);
        expect(postData['data']).toBeDefined();
        expect(postData['data']['id']).toBe(1);
        expect(postData['data']['type']).toBe('users');
        expect(postData['data']['attributes']).toBeDefined();

        expect(postData['data']['attributes']['first-name']).toBe('test1');
        expect(postData['data']['attributes']['last-name']).toBe('test2');
        expect(postData['data']['attributes']['role']).toBe('role');
        expect(postData['data']['attributes']['email']).toBe('test@test.dev');
    });

    it('creates a proper structure for create action', () => {
        let user = new User(1, {
            "first-name": 'test1',
            "last-name": 'test2',
            "password": 'benc',
            "role": 'role',
            "email": 'test@test.dev'
        });


        let postData = service.getCreateUserPostData(user);
        expect(postData['data']).toBeDefined();
        expect(postData['data']['id']).toBeUndefined();
        expect(postData['data']['type']).toBe('users');
        expect(postData['data']['attributes']).toBeDefined();

        expect(postData['data']['attributes']['first-name']).toBe('test1');
        expect(postData['data']['attributes']['last-name']).toBe('test2');
        expect(postData['data']['attributes']['role']).toBe('role');
        expect(postData['data']['attributes']['email']).toBe('test@test.dev');
        expect(postData['data']['attributes']['password']).toBe('benc');
    });
});
