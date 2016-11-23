import { Component, OnInit }                       from '@angular/core';
import { Router, ActivatedRoute }                  from '@angular/router';
import { AuthHttp }                                from 'angular2-jwt';
import { GroupService }                            from '../../../services/group.service';
import { UserService }                            from '../../../services/user.service';
import { Group }                                   from '../../../group';
import { User }                                   from '../../../user';

const styles = require('./edit-group.component.scss');
const template = require('./edit-group.component.html');

@Component({
  selector: 'edit-group',
  template: template,
  styles: [ styles ],
})
export class EditGroupComponent {
  group: Group;
  users: User[];
  private sub: any;

  // messages
  success:string = '';
  updateSuccess:string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: GroupService,
    private userService: UserService) {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.service.getGroup(id).then((group) => {
                     this.group = group;
                   });
      this.userService.getUsersByGroup(id).then((users) => {
                     this.users = users;
                   });
    });
  }

  removeUserFromGroup(userId): void {
    let user = this.users.filter((u) => { return +u.id === +userId })[0]
    this.success = '';
    this.service.removeUserFromGroup(+this.group.id, +userId).then(() => {
      this.users = this.users.filter((user) => {
        return +user.id !== +userId
      })
      this.success = 'Usunięto z grupy użytkownika: ' + user.first_name + ' ' + user.last_name;
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
}
