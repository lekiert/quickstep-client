import { JwtHelper } from 'angular2-jwt';


export function getAuthenticatedUserId() {
  let helper = new JwtHelper;
  let token = localStorage.getItem(process.env.TOKEN_NAME);

  if (token && helper.decodeToken(token)) {
    return helper.decodeToken(token).sub;
  }

  return null;
}
