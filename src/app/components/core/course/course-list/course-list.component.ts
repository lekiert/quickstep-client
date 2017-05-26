import {Component} from "@angular/core";
import {CourseService} from "app/services/course/course.service";
import {Course} from "app/course";
import {User} from "app/user";
import {AuthService} from "../../../../services/auth/auth.service";

const styles = require('./course-list.component.scss');
const template = require('./course-list.component.html');

@Component({
  selector: 'course-list',
  template: template,
  styles: [ styles ],
})
export class CourseListComponent {

  user: User;
  courses: Course[];

  constructor(private service: CourseService,
              private authService: AuthService) {}

  getCourses(): void {
    this.authService.getAuthenticatedUser().then(
      user => {
        this.user = user;
        if (this.user.isAdmin()) {
            console.log('admin');
          this.service.getCourses().then(courses => this.courses = courses);
        } else if (this.user.isTeacher()) {
            console.log('teacher');
          this.service.getTeacherCourses(this.user.id).then(courses => this.courses = courses);
        } else {
            console.log('user');
          this.service.getUserCourses(this.user.id).then(courses => this.courses = courses);
        }
      }
    );
  }

  ngOnInit(): void {
    this.getCourses();
  }
}
