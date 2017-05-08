import { NgModule } from '@angular/core'
import { RouterModule } from "@angular/router";
import { rootRouterConfig } from "./app.routes";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule, Http, RequestOptions } from "@angular/http";
import { ExerciseListComponent } from "./components/core/exercise/exercise-list/exercise-list.component";
import { CourseListComponent } from "./components/core/course/course-list/course-list.component";
import { UserListComponent } from "./components/core/user/user-list/user-list.component";
import { GroupListComponent } from "./components/core/group/group-list/group-list.component";
import { CourseComponent } from "./components/core/course/course.component";
import { TestComponent } from "./components/core/test/test.component";
import { SettingsComponent } from './components/core/user/settings/settings.component';
import { AddUserComponent } from './components/core/user/add-user/add-user.component';
import { AddTestComponent } from './components/core/test/add-test/add-test.component';
import { AddCourseComponent } from './components/core/course/add-course/add-course.component';
import { AddGroupComponent } from './components/core/group/add-group/add-group.component';
import { EditUserComponent } from './components/core/user/edit-user/edit-user.component';
import { EditGroupComponent } from './components/core/group/edit-group/edit-group.component';
import { EditTestComponent } from './components/core/test/edit-test/edit-test.component';
import { ExerciseFormComponent } from './components/core/exercise/exercise-forms/exercise-form.component';
import { StudentBracketsComponent } from './components/core/user/student/student-exercises/brackets/student-brackets.component';
import { StudentChoiceComponent } from './components/core/user/student/student-exercises/choice/student-choice.component';
import { HomeComponent } from './components/home/home.component';
import { SearchFieldComponent } from './components/util/search-field/search-field.component';
import { FileUploadComponent } from './components/util/file-upload/file-upload.component';
import { AuthGuard } from './common/auth.guard';
import { Login } from './components/login';
import { AuthHttp } from 'angular2-jwt';
import { ExerciseService } from './services/exercise.service';
import { CourseService } from './services/course.service';
import { UserService } from './services/user.service';
import { TestService } from './services/test.service';
import { AnswerService } from './services/answer.service';
import { GroupService } from './services/group.service';
import { InformationService } from './services/information.service';
import { StatsComponent } from './components/core/user/stats/stats.component';
import { BracketsFormComponent } from './components/core/exercise/exercise-forms/brackets/brackets-form.component';
import { ChoiceFormComponent } from './components/core/exercise/exercise-forms/choice/choice-form.component';
import { AnswerComponent } from './components/core/answer/answer.component';
import { AnswerListComponent } from './components/core/answer/answer-list/answer-list.component';
import { authHttpServiceFactory } from './common/helpers'
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { StudentGroupsComponent } from './components/core/user/student/student-groups/student-groups.component';
import { AuthAdminGuard } from "./common/auth-admin.guard";
import { AuthSupervisorGuard } from "./common/auth-supervisor.guard";


@NgModule({
    declarations: [AppComponent,
        HomeComponent,
        ExerciseListComponent,
        CourseListComponent,
        Login,
        CourseComponent,
        SettingsComponent,
        TestComponent,
        UserListComponent,
        AddUserComponent,
        AddTestComponent,
        AddCourseComponent,
        EditUserComponent,
        EditTestComponent,
        GroupListComponent,
        EditGroupComponent,
        AddGroupComponent,
        SearchFieldComponent,
        FileUploadComponent,
        StatsComponent,
        StudentBracketsComponent,
        StudentChoiceComponent,
        ExerciseFormComponent,
        BracketsFormComponent,
        ChoiceFormComponent,
        AnswerComponent,
        AnswerListComponent,
        StudentGroupsComponent,
    ],

    imports     : [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(rootRouterConfig),
        ChartsModule
    ],

    providers   : [
        AuthGuard,
        AuthAdminGuard,
        AuthSupervisorGuard,
        ExerciseService,
        CourseService,
        UserService,
        TestService,
        GroupService,
        AnswerService,
        InformationService,
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [ Http, RequestOptions ]
        }
    ],

    bootstrap   : [AppComponent]
})

export class AppModule {}
