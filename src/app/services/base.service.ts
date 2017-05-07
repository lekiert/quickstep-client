import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export abstract class BaseService {

  constructor (protected authHttp: AuthHttp) {}

  protected coursesUrl = environment.API_URL + 'courses';
  protected usersUrl = environment.API_URL + 'users';
  protected teachersUrl = environment.API_URL + 'teachers';
  protected groupsUrl = environment.API_URL + 'groups';
  protected exercisesUrl = environment.API_URL + 'exercises';
  protected testsUrl = environment.API_URL + 'tests';
  protected userLogsUrl = environment.API_URL + 'user-logs';
  protected answersUrl = environment.API_URL + 'answers';

}
