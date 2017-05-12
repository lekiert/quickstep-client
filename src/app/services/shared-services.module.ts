import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {ExercisePostDataService} from "./exercise-post-data.service";
import {UserPostDataService} from "./user-post-data.service";
import {AnswerService} from "./answer.service";
import {AuthService} from "./auth.service";
import {InformationService} from "./information.service";
import {StorageService} from "./storage.service";
import {CourseService} from "./course.service";
import {ExerciseService} from "./exercise.service";
import {TestService} from "./test.service";
import {UserService} from "./user.service";
import {GroupService} from "./group.service";

@NgModule({
    imports: [ CommonModule ],
    providers: [ AnswerService, AuthService, CourseService, ExerciseService, ExercisePostDataService,
    GroupService, InformationService, StorageService, TestService, UserService, UserPostDataService ],
})
export class SharedServicesModule {
}