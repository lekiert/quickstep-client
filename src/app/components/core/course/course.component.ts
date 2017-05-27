import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "app/services/course/course.service";
import {TestService} from "app/services/test/test.service";
import {UserService} from "app/services/user/user.service";
import {Course} from "app/course";
import {Test} from "app/test";
import {User} from "app/user";
import {AuthService} from "../../../services/auth/auth.service";

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
    private courseService: CourseService,
    private authService: AuthService,
    private testService: TestService) {}

  user: User;
  course: Course;
  tests: Test[] = []; 
  private sub: any;
  id: number;
  error:string = '';

    ngOnInit() {
        this.authService.getAuthenticatedUser().then(user => this.user = user)
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
            if (this.id) {
                this.courseService.getCourse(this.id)
                    .then((course) => this.course = course)
                    .catch((error) => {
                        if (error.status === 404) {
                            this.error = "Nie odnaleziono żądanego kursu";
                        }
                    });
            }
            this.testService.getTestsByCourse(this.id).then((tests) => {
              this.tests = tests;
            });
        });
    }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
