import { Component, OnInit }                       from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router }                                  from '@angular/router';
import { AuthHttp }                                from 'angular2-jwt';
import { UserService }                        from '../../../services/user.service';
import { User }                               from '../../../user';

const styles = require('./user-list.component.scss');
const template = require('./user-list.component.html');

@Component({
  selector: 'user-list',
  template: template,
  styles: [ styles ],
})
export class UserListComponent {
  constructor(private service: UserService) {

  }

  filters = [
    { name: 'Wszyscy', value: 'ALL' },
    { name: 'Uczeń', value: 'STUDENT' },
    { name: 'Nauczyciel', value: 'TEACHER' },
    { name: 'Kierownik', value: 'SUPERVISOR' },
    { name: 'Administrator', value: 'ADMIN' },
  ];

  filter = 'ALL';

  users: User[];

  getUsers(): void {
    this.users = [];
    this.service.getUsers(this.filter)
                .then((users) => {
                  this.users = users;
                });
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
