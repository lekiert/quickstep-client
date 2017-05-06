import {Component} from "@angular/core";
import {CourseService} from "app/services/course.service";
import {UserService} from "app/services/user.service";
import {Course} from "app/course";
import {User} from "app/user";

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
        } else if (this.user.isTeacher()) {
          this.service.getTeacherCourses(this.user.id)
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
