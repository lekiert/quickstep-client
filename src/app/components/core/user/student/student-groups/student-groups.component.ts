import { Component, OnInit } from '@angular/core';
import {Group} from "app/group";
import {User} from "app/user";
import {GroupService} from "app/services/group.service";
import {UserService} from "app/services/user.service";
import {GroupListComponent} from "app/components/core/group/group-list/group-list.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'student-groups',
  templateUrl: './student-groups.component.html',
  styleUrls: ['./student-groups.component.scss']
})
export class StudentGroupsComponent implements OnInit {

  groups: Group[];
  user: User;
  private sub: any;
  private studentId: number;
  private student: User;

  constructor(
      private route: ActivatedRoute,
      private service: GroupService,
      private userService: UserService) {}

  getGroups(): void {
    this.service.getGroups()
        .then((groups) => {
          this.groups = groups;
        });
  }

  getUserGroups(): void {
    if (this.student) {
        if (this.student.isTeacher()) {
            this.service.getTeacherGroups(this.student.id).then(groups =>  this.groups = groups)
        } else {
            this.service.getUserGroups(this.studentId).then(groups =>  this.groups = groups);
        }
    } else {
      if (this.user.isTeacher()) {
        this.service.getTeacherGroups(this.user.id).then(groups =>  this.groups = groups)
      } else {
        this.service.getGroups().then(groups => this.groups = groups)
      }
    }
  }

  ngOnInit() {
      this.userService.getAuthenticatedUserObject().then(
          user => {
              this.user = user;
              this.sub = this.route.params.subscribe(params => {
                  let id = +params['id'];
                  this.studentId = id;
                  if (!isNaN(this.studentId)) {
                      this.userService.getUser(this.studentId).then(user =>  {
                          this.student = user;
                          this.getUserGroups()
                      });
                  } else {
                      this.getUserGroups();
                  }
              });
      })
  }
}
