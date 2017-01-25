import { Injectable }               from '@angular/core';
import { Http, Headers, Response, RequestOptions }  from '@angular/http';
import { Group }                     from '../group';
import { User }                     from '../user';
import { Observable }               from 'rxjs/Observable';
import { AuthHttp }                 from 'angular2-jwt';
import { contentHeaders }         from '../common/headers';
import { environment } from '../../environments/environment';

@Injectable()
export class GroupService {

  private groupsUrl = environment.API_URL + 'groups';
  private usersUrl = environment.API_URL + 'users';
  private teachersUrl = environment.API_URL + 'teachers';

  constructor (private authHttp: AuthHttp) {}

  getGroups(): Promise<Group[]> {
    return this.authHttp.get(this.groupsUrl, { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return data.map((item) => {
                   return new Group(item.id, item.attributes);
                 })
               });
  }

  getGroup(id: number): Promise<Group> {
    return this.authHttp.get(this.groupsUrl + '/' + id, { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return new Group(data.id, data.attributes);
               });
  }

  removeUserFromGroup(groupId: number, userId: number) {
    return this.authHttp.delete(this.groupsUrl + '/' + groupId + '/relationships/users',
      {
        body: {
            data: [
              { type: "users", id: userId }
            ]
        }
      }
    )
   .toPromise();
  }

  removeTeacherFromGroup(groupId: number, userId: number) {
    return this.authHttp.delete(this.groupsUrl + '/' + groupId + '/relationships/teachers',
      {
        body: {
            data: [
              { type: "teachers", id: userId }
            ]
        }
      }
    )
   .toPromise();
  }

  addUserToGroup(groupId: number, user: User) {
    return this.authHttp.post(this.groupsUrl + '/' + groupId + '/relationships/users',
      {
        data: [
          { type: "users", id: user.id }
        ]
      }, { headers: contentHeaders }
    )
   .toPromise();
  }

  addTeacherToGroup(groupId: number, user: User) {
    return this.authHttp.post(this.groupsUrl + '/' + groupId + '/relationships/teachers',
      {
        data: [
          { type: "teachers", id: user.id }
        ]
      }, { headers: contentHeaders }
    )
   .toPromise();
  }

  createGroup(group): Promise<any> {
    return this.authHttp.post(this.groupsUrl, {
      data: {
        type: "groups",
        attributes: {
          "name": group.name,
          "description": group.description,
        }
      }
    }, { headers: contentHeaders }).toPromise();
  }

  deleteGroup(id): Promise<boolean> {
    return this.authHttp.delete(this.groupsUrl + '/' + id).toPromise().then((response) => {
      return true;
    });
  }

  updateGroup(group: Group): Promise<boolean> {
    return this.authHttp.patch(this.groupsUrl + '/' + group.id, {
      data: {
        id: group.id,
        type: "groups",
        attributes: {
          "name": group.name,
          "description": group.description,
        }
      }
    }, { headers: contentHeaders }).toPromise().then((response) => {
      return true;
    });
  }
}
