import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {CourseComponent} from "./course.component";
import {CourseListComponent} from "./course-list/course-list.component";
import {AddCourseComponent} from "./add-course/add-course.component";
import {RouterModule} from "@angular/router";
import {UtilModule} from "../../util/util.module";


@NgModule({
  imports: [ CommonModule, FormsModule, RouterModule, UtilModule ],
  declarations: [ CourseComponent, CourseListComponent, AddCourseComponent ],
  exports: [ CourseComponent, CourseListComponent, AddCourseComponent ]
})
export class CourseModule { }
