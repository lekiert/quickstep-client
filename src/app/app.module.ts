import { NgModule } from '@angular/core'
import { RouterModule } from "@angular/router";
import { rootRouterConfig } from "./app.routes";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule, Http, RequestOptions } from "@angular/http";
import { ExcerciseListComponent } from "./components/core/excercise-list/excercise-list.component";
import { CourseListComponent } from "./components/core/course-list/course-list.component";
import { UserListComponent } from "./components/core/user-list/user-list.component";
import { GroupListComponent } from "./components/core/group-list/group-list.component";
import { CourseComponent } from "./components/core/course/course.component";
import { TestComponent } from "./components/core/test/test.component";
import { SettingsComponent } from './components/core/settings/settings.component';
import { AddUserComponent } from './components/core/add-user/add-user.component';
import { AddTestComponent } from './components/core/add-test/add-test.component';
import { AddCourseComponent } from './components/core/add-course/add-course.component';
import { AddGroupComponent } from './components/core/add-group/add-group.component';
import { EditUserComponent } from './components/core/edit-user/edit-user.component';
import { EditGroupComponent } from './components/core/edit-group/edit-group.component';
import { EditTestComponent } from './components/core/edit-test/edit-test.component';
import { ExcerciseFormComponent } from './components/core/forms/excercise-form.component';
import { StudentBracketsComponent } from './components/core/student-excercises/brackets/student-brackets.component';
import { StudentChoiceComponent } from './components/core/student-excercises/choice/student-choice.component';
import { HomeComponent } from './components/home/home.component';
import { SearchFieldComponent } from './components/util/search-field/search-field.component';
import { FileUploadComponent } from './components/util/file-upload/file-upload.component';
import { AuthGuard } from './common/auth.guard';
import { Login } from './components/login';
import { AuthHttp } from 'angular2-jwt';
import { ExcerciseService } from './services/excercise.service';
import { CourseService } from './services/course.service';
import { UserService } from './services/user.service';
import { TestService } from './services/test.service';
import { GroupService } from './services/group.service';
import { InformationService } from './services/information.service';
import { BaseService } from './services/base.service';
import { StatsComponent } from './components/core/stats/stats.component';
import { BracketsFormComponent } from './components/core/forms/brackets/brackets-form.component';
import { ChoiceFormComponent } from './components/core/forms/choice/choice-form.component';
import { AnswerComponent } from './components/core/answer/answer.component';
import { AnswerListComponent } from './components/core/answer-list/answer-list.component';
import { authHttpServiceFactory } from './common/helpers'
import { ChartsModule } from 'ng2-charts/ng2-charts';


@NgModule({
    declarations: [AppComponent,
        HomeComponent,
        ExcerciseListComponent,
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
        ExcerciseFormComponent,
        BracketsFormComponent,
        ChoiceFormComponent,
        AnswerComponent,
        AnswerListComponent
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
        BaseService,
        ExcerciseService,
        CourseService,
        UserService,
        TestService,
        GroupService,
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
