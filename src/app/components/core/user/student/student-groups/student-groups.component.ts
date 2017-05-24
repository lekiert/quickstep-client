import { Component, OnInit } from '@angular/core';
import {Group} from "app/group";
import {User} from "app/user";
import {GroupService} from "app/services/group/group.service";
import {UserService} from "app/services/user/user.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "app/services/auth/auth.service";

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
      private groupService: GroupService,
      private userService: UserService,
      private authService: AuthService) {}

  getGroups(): void {
    this.groupService.getGroups()
        .then((groups) => {
          this.groups = groups;
        });
  }

  getUserGroups(): void {
    if (this.student) {
        if (this.student.isTeacher()) {
            this.groupService.getTeacherGroups(this.student.id).then(groups =>  this.groups = groups)
        } else {
            this.groupService.getUserGroups(this.studentId).then(groups =>  this.groups = groups);
        }
    } else {
      if (this.user.isTeacher()) {
        this.groupService.getTeacherGroups(this.user.id).then(groups =>  this.groups = groups)
      } else {
        this.groupService.getGroups().then(groups => this.groups = groups)
      }
    }
  }

  ngOnInit() {
      this.authService.getAuthenticatedUser().then(
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
