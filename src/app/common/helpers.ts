import { JwtHelper } from 'angular2-jwt';


export function getAuthenticatedUserId() {
  let helper = new JwtHelper;
  let token = localStorage.getItem(process.env.TOKEN_NAME);

  return helper.decodeToken(token).sub;
}
