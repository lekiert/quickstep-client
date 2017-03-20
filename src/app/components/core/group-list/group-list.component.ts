import {Component} from "@angular/core";
import {GroupService} from "../../../services/group.service";
import {UserService} from "../../../services/user.service";
import {Group} from "../../../group";
import {User} from "../../../user";

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
  user: User;

  getGroups(): void {
    this.service.getGroups()
                .then((groups) => {
                  this.groups = groups;
                });
  }


  getUserGroups(): void {
    this.userService.getAuthenticatedUserObject().then(
      user => {
        this.user = user;
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
