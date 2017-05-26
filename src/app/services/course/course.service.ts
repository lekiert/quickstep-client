import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Course} from '../../course';
import {BaseService} from '../base.service';
import {AuthHttp} from "angular2-jwt";
import {CoursePostDataService} from "./course-post-data.service";

@Injectable()
export class CourseService extends BaseService {

    constructor(
        protected authHttp: AuthHttp,
        private postData: CoursePostDataService) {
        super(authHttp);
    }

    getCourses(): Promise<Course[]> {
        return this.get(this.coursesUrl)
            .then((response) => {
                return this.createCourseListFromResponse(response)
            }).catch(this.handleError);
    }

    getCoursesByUser(id): Promise<Course[]> {
        let url = `${this.usersUrl}/${id}/courses`;
        return this.get(url)
            .then((response) => {
                return this.createCourseListFromResponse(response)
            }).catch(this.handleError);
    }

    getUserCourses(id): Promise<Course[]> {
        let url = `${this.usersUrl}/${id}/groups?include=courses;`
        return this.get(url)
            .then((response) => this.createCourseList(response.json().included))
            .catch(this.handleError);
    }

    getTeacherCourses(id): Promise<Course[]> {
        let url = `${this.teachersUrl}/${id}/groups?include=courses`;
        return this.get(url)
            .then((response) => this.createCourseList(response.json().included))
            .catch(this.handleError);
    }

    getCourse(id: number): Promise<Course> {
        let url = `${this.coursesUrl}/${id}`;
        return this.get(url)
            .then((response) => { return this.createCourseFromResponse(response) });
    }

    public createCourse(course) {
        let data = this.postData.getCreateCoursePostData(course);
        return this.post(this.coursesUrl, data);
    }

    public updateCourse(course) {
        let url = `${this.coursesUrl}/${course.id}`;
        let data = this.postData.getUpdateCoursePostData(course);
        return this.authHttp.patch(url, data);
    }

    private createCourseFromResponse(response: Response): Course {
        let data = response.json().data;
        return new Course(data.id, data.attributes);
    }

    private createCourseListFromResponse(response: Response): Course[] {
        let data = response.json().data;
        return this.createCourseList(data);
    }

    private createCourseList(data): Course[] {
        return data.map((item) => {
            return new Course(item.id, item.attributes);
        });
    }
}
