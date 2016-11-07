import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../course';

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
    private service: CourseService) {}

  course: Course;
  private sub: any;
  id: number;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       this.service.getCourse(this.id).then((course) => {
         this.course = course;
         console.log(course);
       });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
