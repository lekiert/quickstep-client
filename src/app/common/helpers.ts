import { JwtHelper } from 'angular2-jwt';
import { environment } from '../../environments/environment';


export function getAuthenticatedUserId() {
  let helper = new JwtHelper;
  let token = localStorage.getItem(environment.TOKEN_NAME);

  if (token && helper.decodeToken(token)) {
    return helper.decodeToken(token).sub;
  }

  return null;
}
