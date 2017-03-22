import { JwtHelper } from 'angular2-jwt';
import { environment } from 'environments/environment';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';


export function getAuthenticatedUserId() {
  let helper = new JwtHelper;
  let token = localStorage.getItem(environment.TOKEN_NAME);

  if (token && helper.decodeToken(token)) {
    return helper.decodeToken(token).sub;
  }

  return null;
}

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: environment.TOKEN_NAME,
    tokenGetter: (() => localStorage.getItem(environment.TOKEN_NAME)),
    globalHeaders: [{'Content-Type':'application/json'}],
  }), http, options);
}
