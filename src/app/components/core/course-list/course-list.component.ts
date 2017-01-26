import { Component, OnInit }                       from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router }                                  from '@angular/router';
import { AuthHttp }                                from 'angular2-jwt';
import { CourseService }                           from '../../../services/course.service';
import { UserService }                             from '../../../services/user.service';
import { Course }                                  from '../../../course';
import { User }                                    from '../../../user';

const styles = require('./course-list.component.scss');
const template = require('./course-list.component.html');

@Component({
  selector: 'course-list',
  template: template,
  styles: [ styles ],
})
export class CourseListComponent {
  constructor(private service: CourseService,
              private userService: UserService) {}

  user: User;
  courses: Course[];

  // todo: fix callback hell
  getCourses(): void {
    this.userService.getAuthenticatedUserObject().then(
      user => {
        this.user = user;
        if (this.user.isAdmin()) {
          this.service.getCourses()
                      .then((courses) => {
                        this.courses = courses;
                      });
        } else {
          this.service.getUserCourses(this.user.id)
                      .then((courses) => {
                        this.courses = courses;
                      });
        }
      }
    );
  }

  ngOnInit(): void {
    this.getCourses();
  }
}
