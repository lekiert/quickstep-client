import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {ExercisePostDataService} from "./exercise/exercise-post-data.service";
import {UserPostDataService} from "./user/user-post-data.service";
import {AnswerService} from "./answer/answer.service";
import {AuthService} from "./auth/auth.service";
import {InformationService} from "./information/information.service";
import {StorageService} from "./storage/storage.service";
import {CourseService} from "./course/course.service";
import {ExerciseService} from "./exercise/exercise.service";
import {TestService} from "./test/test.service";
import {UserService} from "./user/user.service";
import {GroupService} from "./group/group.service";
import {CoursePostDataService} from "./course/course-post-data.service";

@NgModule({
    imports: [ CommonModule ],
    providers: [ AnswerService, AuthService, CourseService, ExerciseService, ExercisePostDataService,
    GroupService, InformationService, StorageService, TestService, UserService, UserPostDataService,
    CoursePostDataService ],
})
export class SharedServicesModule {
}