import { Component, OnInit }                       from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router }                                  from '@angular/router';
import { AuthHttp }                                from 'angular2-jwt';
import { CourseService }                        from '../../../services/course.service';
import { Course }                               from '../../../course';

const styles = require('./course-list.component.scss');
const template = require('./course-list.component.html');

@Component({
  selector: 'course-list',
  template: template,
  styles: [ styles ],
})
export class CourseListComponent {
  constructor(private service: CourseService) {

  }

  courses: Course[];

  getCourses(): void {
    this.service.getCourses()
                .then((courses) => {
                  this.courses = courses;
                });
  }

  ngOnInit(): void {
    this.getCourses();
  }
}
