import { Component, OnInit }                       from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute, Params }          from '@angular/router';
import { AuthHttp }                                from 'angular2-jwt';
import { TestService }                             from '../../../services/test.service';
import { Course }                                    from '../../../course';

const styles = require('./add-course.component.scss');
const template = require('./add-course.component.html');

@Component({
  selector: 'add-course',
  template: template,
  styles: [ styles ],
})
export class AddCourseComponent {

  course = {
    name: '',
    description: '',
    level: '1'
  };

  result = null;

  constructor(
    private service: TestService) {}

  ngOnInit(): void {
    this.course = this.createStub();
  }

  saveCourse(): void {
    this.service.createCourse(this.course).then(() => {
      this.result = true;
    }).catch(() => {
      this.result = false;
    });
  }

  createStub() {
    return {
      name: '',
      description: '',
      level: '1'
    }
  }

}
