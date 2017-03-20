import {Component} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {User} from "../../../user";

const styles = require('./user-list.component.scss');
const template = require('./user-list.component.html');

@Component({
  selector: 'user-list',
  template: template,
  styles: [ styles ],
})
export class UserListComponent {

  user: User;

  constructor(private service: UserService) {}

  filters = [
    { name: 'Wszyscy', value: 'ALL' },
    { name: 'Uczeń', value: 'STUDENT' },
    { name: 'Nauczyciel', value: 'TEACHER' },
    { name: 'Kierownik', value: 'SUPERVISOR' },
    { name: 'Administrator', value: 'ADMIN' },
  ];

  filter = 'ALL';

  users: User[];

  getUsers(type?: string): void {
    this.users = [];
    if (type && type === 'TEACHER') {
      this.service.getTeachers(this.filter)
                .then((users) => {
                  this.users = users;
                });
    }

    this.service.getUsers(this.filter)
                .then((users) => {
                  this.users = users;
                });
  }

  ngOnInit(): void {
    this.service.getAuthenticatedUserObject().then(
      user => {
        this.user = user
        if (user.isSupervisor()) {
          this.filter = 'TEACHER';
        }
        this.getUsers();
      }
    )

  }
}
