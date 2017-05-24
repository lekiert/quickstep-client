import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';

import {UserService} from "./user.service";
import {UserPostDataService} from "./user-post-data.service";
import {BaseRequestOptions, ConnectionBackend, Http, HttpModule, ResponseOptions} from "@angular/http";
import {AuthConfig, AuthHttp} from "angular2-jwt";
import {MockBackend} from '@angular/http/testing';
import {Response} from '@angular/http';
import {environment} from "environments/environment"
import {User} from "../../user";
import {encodeTestToken} from "angular2-jwt/angular2-jwt-test-helpers";

describe('UserService', () => {

    let service: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            // imports: [
            //     HttpModule
            // ],
            providers: [
                UserService,
                UserPostDataService,
                BaseRequestOptions,
                MockBackend,
                // {
                //     provide: AuthHttp,
                //     useFactory: (http) => {
                //         return new AuthHttp(new AuthConfig(), http);
                //     },
                //     deps: [Http]
                // },
                {provide: Http, useFactory: (backend: ConnectionBackend,
                                             defaultOptions: BaseRequestOptions) => {
                    return new Http(backend, defaultOptions);
                }, deps: [MockBackend, BaseRequestOptions]},
                {
                    provide: AuthHttp,
                    useFactory: (http) => {
                        return new AuthHttp(new AuthConfig({
                            tokenName: 'jwt',
                            tokenGetter: (() => encodeTestToken(this)),
                            globalHeaders: [{'Content-Type': 'application/vnd.api+json'}]
                        }), http);
                    },
                    deps: [Http]
                }
            ]
        });
    });

    it('creates an instance', inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
    }));

    it('getUser returns a user', inject([UserService, MockBackend],
        fakeAsync((userService, mockBackend) => {
            let expectedUser = new User(1, {
                "first-name":"Test",
                "last-name":"Admin",
                "role":"ADMIN",
                "email":"admin@quickstep.dev",
                "password": null
            });
            var user: User;

            mockBackend.connections.subscribe(c => {
               expect(c.request.url).toBe(`${environment.API_URL}users/1/`);
               let response = new ResponseOptions({
                  body: `{
                      "data":{
                          "id":"1",
                          "type":"users",
                          "links":{
                              "self": "${environment.API_URL}users/1/"
                          },
                          "attributes":{
                              "first-name":"Test",
                              "last-name":"Admin",
                              "role":"ADMIN",
                              "email":"admin@quickstep.dev",
                              "created-at":"20:17, 11.01.2017 ",
                              "password":null
                          }
                      }
                  }`
               });
               c.mockRespond(new Response(response));
            });

            userService.getUser(1).then(_user => user = _user);
            tick();

            expect(+user.id).toBe(+expectedUser.id);
            expect(user.first_name).toBe(expectedUser.first_name);
            expect(user.last_name).toBe(expectedUser.last_name);
            expect(user.role).toBe(expectedUser.role);
            expect(user.email).toBe(expectedUser.email);
        }))
    );
});
