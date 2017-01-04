import { Component, OnInit }                       from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute, Params }          from '@angular/router';
import { AuthHttp }                                from 'angular2-jwt';
import { TestService }                             from '../../../services/test.service';
import { Test }                                    from '../../../test';

const styles = require('./add-test.component.scss');
const template = require('./add-test.component.html');

@Component({
  selector: 'add-test',
  template: template,
  styles: [ styles ],
})
export class AddTestComponent {

  test = {
    name: '',
    description: '',
  };

  result = null;
  private sub: any;
  private courseId: any;

  constructor(
    private service: TestService,
    private route: ActivatedRoute) {

    }

  ngOnInit(): void {
    this.test = this.createStub();
    this.sub = this.route.params.subscribe(params => {
       this.courseId = +params['id']; // (+) converts string 'id' to a number
    });
  }

  saveTest(): void {
    this.service.createCourseTest(this.courseId, this.test).then(() => {
      this.result = true;
    }).catch(() => {
      this.result = false;
    });
  }

  createStub() {
    return {
      name: '',
      description: '',
    }
  }

}
