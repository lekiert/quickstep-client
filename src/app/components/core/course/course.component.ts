import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { TestService } from '../../../services/test.service';
import { Course } from '../../../course';
import { Test } from '../../../test';

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
    private testService: TestService) {}

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
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
