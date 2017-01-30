import { Component, OnInit }                       from '@angular/core';
import { Router }                                  from '@angular/router';
import { AuthHttp }                                from 'angular2-jwt';
import { GroupService }                            from '../../../services/group.service';
import { UserService }                             from '../../../services/user.service';
import { Group }                                   from '../../../group';

const styles = require('./group-list.component.scss');
const template = require('./group-list.component.html');

@Component({
  selector: 'group-list',
  template: template,
  styles: [ styles ],
})
export class GroupListComponent {
  constructor(private service: GroupService, private userService: UserService) {}

  groups: Group[];

  getGroups(): void {
    this.service.getGroups()
                .then((groups) => {
                  this.groups = groups;
                });
  }


  getUserGroups(): void {
    this.userService.getAuthenticatedUserObject().then(
      user => {
        if (user.isTeacher()) {
          this.service.getTeacherGroups(user.id)
                      .then((groups) => {
                        this.groups = groups;
                      });
        } else {
          this.service.getGroups()
                      .then((groups) => {
                        this.groups = groups;
                      });
        }

      }
    );
  }

  ngOnInit(): void {
    this.getUserGroups();
  }
}
