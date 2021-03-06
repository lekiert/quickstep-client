import { Injectable } from '@angular/core';
import { Group } from '../../group';
import { User } from '../../user';
import { Course } from '../../course';
import { contentHeaders } from '../../common/headers';
import { BaseService } from '../base.service';

@Injectable()
export class GroupService extends BaseService {

  private mapGroupListFromResponse(response) {
      let data = response.json().data;

      return data.map((item) => {
          return new Group(item.id, item.attributes);
      })
  }

  getGroups(): Promise<Group[]> {
    return this.authHttp.get(this.groupsUrl, { headers: contentHeaders })
               .toPromise()
               .then(response => this.mapGroupListFromResponse(response));
  }

  getTeacherGroups(id): Promise<Group[]> {
    return this.authHttp.get(this.teachersUrl + '/' + id + '/groups', { headers: contentHeaders })
               .toPromise()
               .then(response => this.mapGroupListFromResponse(response));
  }

  getUserGroups(id): Promise<Group[]> {
    return this.authHttp.get(this.usersUrl + '/' + id + '/groups', { headers: contentHeaders })
               .toPromise()
               .then(response => this.mapGroupListFromResponse(response));
  }

  getGroup(id: number): Promise<Group> {
    return this.authHttp.get(this.groupsUrl + '/' + id, { headers: contentHeaders })
               .toPromise()
               .then((response) => {
                 let data = response.json().data;

                 return new Group(data.id, data.attributes);
               });
  }

  getGroupWithCourses(id: number) {
    return this.authHttp.get(this.groupsUrl + '/' + id + '/?include=courses', {
      headers: contentHeaders
    })
     .toPromise()
     .then((response) => {
       let data = response.json().data;
       let included = response.json().included;
       let courses = [];
       if (typeof included !== 'undefined') {
         courses = included.map((item) => {
           console.log(item);
           return new Course(item.id, item.attributes);
         })
       }

       let group = new Group(data.id, data.attributes);
       return { group: group, courses: courses };
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

  removeCourseFromGroup(groupId: number, courseId: number) {
    return this.authHttp.delete(this.groupsUrl + '/' + groupId + '/relationships/courses',
      {
        body: {
            data: [
              { type: "courses", id: courseId }
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

  addCourseToGroup(groupId: number, courseId: number) {
    return this.authHttp.post(this.groupsUrl + '/' + groupId + '/relationships/courses',
      {
        data: [
          { type: "courses", id: courseId }
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
