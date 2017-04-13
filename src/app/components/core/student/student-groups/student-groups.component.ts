import { Component, OnInit } from '@angular/core';
import {Group} from "../../../../group";
import {User} from "../../../../user";
import {GroupService} from "../../../../services/group.service";
import {UserService} from "../../../../services/user.service";
import {GroupListComponent} from "../../group-list/group-list.component";
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
      private userService: UserService) {
      this.userService.getAuthenticatedUser().subscribe(
          user => {
            this.user = user;
            this.sub = this.route.params.subscribe(params => {
              let id = +params['id'];
              this.studentId = id;
              if (!isNaN(this.studentId)) {
                  this.userService.getUser(this.studentId).then(user => this.student = user);
              }
              this.getUserGroups()
            });
          },
          error => console.log(error)
      )
  }

  getGroups(): void {
    this.service.getGroups()
        .then((groups) => {
          this.groups = groups;
        });
  }

  getUserGroups(): void {
    if (this.studentId) {
      this.service.getUserGroups(this.studentId).then(groups =>  this.groups = groups);
    } else {
      if (this.user.isTeacher()) {
        this.service.getTeacherGroups(this.user.id).then(groups =>  this.groups = groups)
      } else {
        this.service.getGroups().then(groups => this.groups = groups)
      }
    }
  }

  ngOnInit() {

  }
}
