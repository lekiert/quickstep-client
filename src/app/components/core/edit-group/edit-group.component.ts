import { Component, OnInit }                       from '@angular/core';
import { Router, ActivatedRoute }                  from '@angular/router';
import { AuthHttp }                                from 'angular2-jwt';
import { SearchFieldComponent }                    from '../../util/search-field/search-field.component';
import { GroupService }                            from '../../../services/group.service';
import { UserService }                             from '../../../services/user.service';
import { Group }                                   from '../../../group';
import { User }                                    from '../../../user';

const styles = require('./edit-group.component.scss');
const template = require('./edit-group.component.html');

@Component({
  selector: 'edit-group',
  template: template,
  styles: [ styles ]
})
export class EditGroupComponent {
  group: Group;
  users: User[];
  teachers: User[];
  private sub: any;
  private selectedUser = null;
  private selectedTeacher = null;

  // messages
  success:string = '';
  updateSuccess:string = '';
  teacherSuccess:string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: GroupService,
    private userService: UserService) {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.getGroup(id);
      this.getUsers(id);
      this.getTeachers(id);
    });
  }

  getGroup(id): void {
    this.service.getGroup(id).then((group) => {
      this.group = group;
    });
  }

  getUsers(id): void {
    this.userService.getUsersByGroup(id).then((users) => {
      this.users = users;
    });
  }

  getTeachers(id): void {
    this.userService.getTeachersByGroup(id).then((teachers) => {
      this.teachers = teachers;
    });
  }

  removeUserFromGroup(userId): void {
    let user = this.findUser(userId)
    this.success = '';
    this.service.removeUserFromGroup(+this.group.id, +userId).then(() => {
      this.users = this.users.filter((user) => {
        return +user.id !== +userId
      })
      this.success = 'Usunięto z grupy użytkownika: ' + user.first_name + ' ' + user.last_name;
    })
  }

  removeTeacherFromGroup(userId): void {
    let teacher = this.findTeacher(userId)
    this.success = '';
    this.service.removeTeacherFromGroup(+this.group.id, +userId).then(() => {
      this.teachers = this.teachers.filter((user) => {
        return +user.id !== +userId
      })
      this.teacherSuccess = 'Usunięto z grupy nauczyciela: ' + teacher.first_name + ' ' + teacher.last_name;
    })
  }

  updateGroup(): void {
    this.service.updateGroup(this.group).then(() => {
      this.updateSuccess = 'Zaktualizowano dane grupy';
    });
  }

  deleteGroup(): void {
    this.service.deleteGroup(this.group.id).then(() => {
      this.router.navigate(['/groups']);
    });
  }

  addUser(): void {
    let user = this.selectedUser;
    if (user instanceof User) {
      this.service.addUserToGroup(this.group.id, this.selectedUser).then(() => {
        this.getUsers(this.group.id);
        this.success = 'Dodano użytkownika ' + user.first_name + ' ' + user.last_name + ' do grupy.';
      })
    }
  }

  addTeacher(): void {
    let user = this.selectedTeacher;
    if (user instanceof User) {
      this.service.addTeacherToGroup(this.group.id, this.selectedTeacher).then(() => {
        this.getTeachers(this.group.id);
        this.teacherSuccess = 'Dodano nauczyciela ' + user.first_name + ' ' + user.last_name + ' do grupy.';
      })
    }
  }

  selectUser(user) {
    if (user instanceof User) {
      this.selectedUser = user;
    } else {
      this.selectedUser = null;
    }
  }

  selectTeacher(user) {
    if (user instanceof User && user.isTeacher()) {
      this.selectedTeacher = user;
    } else {
      this.selectedTeacher = null;
    }
  }

  private findTeacher(userId) {
    return this.teachers.filter((u) => { return +u.id === +userId })[0];
  }

  private findUser(userId) {
    return this.users.filter((u) => { return +u.id === +userId })[0];
  }
}
