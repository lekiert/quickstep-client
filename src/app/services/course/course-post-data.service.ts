import { Injectable } from '@angular/core';
import {User} from "../../user";

@Injectable()
export class CoursePostDataService {

    public getCreateCoursePostData(course) {
        return {
            data: {
                type: "courses",
                    attributes: {
                    "name": course.name,
                    "description": course.description
                }
            }
        }
    }

    public getUpdateCoursePostData(course) {
        return {
            data: {
                id: course.id,
                type: "courses",
                attributes: {
                    "name": course.name,
                    "description": course.description
                }
            }
        }
    }

}
