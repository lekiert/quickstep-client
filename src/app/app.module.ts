import { NgModule } from '@angular/core'
import { RouterModule } from "@angular/router";
import { rootRouterConfig } from "./app.routes";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
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
import { AddExcerciseComponent } from './components/core/add-excercise/add-excercise.component';
import { EditUserComponent } from './components/core/edit-user/edit-user.component';
import { EditGroupComponent } from './components/core/edit-group/edit-group.component';
import { EditTestComponent } from './components/core/edit-test/edit-test.component';
import { StudentBracketsComponent } from './components/core/student-excercises/brackets/student-brackets.component';
import { HomeComponent } from './components/home/home.component';
import { SearchFieldComponent } from './components/util/search-field/search-field.component';
import { AuthGuard } from './common/auth.guard';
import { Login } from './components/login';
import { provideAuth } from 'angular2-jwt';
import { ExcerciseService } from './services/excercise.service';
import { CourseService } from './services/course.service';
import { UserService } from './services/user.service';
import { TestService } from './services/test.service';
import { GroupService } from './services/group.service';
import { InformationService } from './services/information.service';
import { contentHeaders } from './common/headers';
import { environment } from '../environments/environment';
import { StatsComponent } from './components/core/stats/stats.component';

import { AddBracketsComponent } from './components/core/add-excercise/brackets/add-brackets.component';

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
                 AddExcerciseComponent,
                 SearchFieldComponent,
                 StatsComponent,
                 StudentBracketsComponent,

                 AddBracketsComponent],

  imports     : [BrowserModule,
                 FormsModule,
                 HttpModule,
                 RouterModule.forRoot(rootRouterConfig)],

  providers   : [AuthGuard,
                 ExcerciseService,
                 CourseService,
                 UserService,
                 TestService,
                 GroupService,
                 InformationService,

                 provideAuth({
                   tokenName: environment.TOKEN_NAME,
                   tokenGetter: () => localStorage.getItem(environment.TOKEN_NAME) // tmp bug in angular2-jwt fix
                 })],

  bootstrap   : [AppComponent]
})

export class AppModule {}
