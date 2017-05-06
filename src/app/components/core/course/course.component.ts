import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "app/services/course.service";
import {TestService} from "app/services/test.service";
import {UserService} from "app/services/user.service";
import {Course} from "app/course";
import {Test} from "app/test";
import {User} from "app/user";

const styles = require('./course.component.scss');
const template = require('./course.component.html');

@Component({
  selector: 'course',
  template: template,
  styles: [ styles ]
})
export class CourseComponent {
  constructor(
    private route: ActivatedRoute,
    private service: CourseService,
    private userService: UserService,
    private testService: TestService) {}

  user: User;
  course: Course;
  tests: Test[];
  private sub: any;
  id: number;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       this.service.getCourse(this.id).then((course) => {
         this.course = course;
       });

       this.testService.getTestsByCourse(this.id).then((tests) => {
         this.tests = tests;
       });
    });

    this.userService.getAuthenticatedUserObject().then(
      user => {
        this.user = user
      }
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
