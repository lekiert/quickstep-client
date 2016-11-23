import { Component, OnInit }                       from '@angular/core';
import { Router }                                  from '@angular/router';
import { AuthHttp }                                from 'angular2-jwt';
import { GroupService }                            from '../../../services/group.service';
import { Group }                                   from '../../../group';

const styles = require('./group-list.component.scss');
const template = require('./group-list.component.html');

@Component({
  selector: 'group-list',
  template: template,
  styles: [ styles ],
})
export class GroupListComponent {
  constructor(private service: GroupService) {}

  groups: Group[];

  getGroups(): void {
    this.service.getGroups()
                .then((groups) => {
                  this.groups = groups;
                });
  }

  ngOnInit(): void {
    this.getGroups();
  }
}
