import { NgModule } from '@angular/core'
import { RouterModule } from "@angular/router";
import { rootRouterConfig } from "./app.routes";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule, Http, RequestOptions } from "@angular/http";
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './common/auth.guard';
import { Login } from './components/login';
import { AuthHttp } from 'angular2-jwt';
import { authHttpServiceFactory } from './common/helpers'
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AuthAdminGuard } from "./common/auth-admin.guard";
import { AuthSupervisorGuard } from "./common/auth-supervisor.guard";
import { UtilModule } from "./components/util/util.module";
import { SharedServicesModule } from "./services/shared-services.module";
import { CourseModule } from "./components/core/course/course.module";
import { AnswerModule } from "./components/core/answer/answer.module";
import { ExerciseModule } from "./components/core/exercise/exercise.module";
import { GroupModule } from "./components/core/group/group.module";
import { TestModule } from "./components/core/test/test.module";
import { UserModule } from "./components/core/user/user.module";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        Login,
    ],

    imports     : [
        AnswerModule,
        BrowserModule,
        ChartsModule,
        CourseModule,
        ExerciseModule,
        FormsModule,
        GroupModule,
        HttpModule,
        RouterModule.forRoot(rootRouterConfig),
        SharedServicesModule,
        TestModule,
        UserModule,
        UtilModule
    ],

    providers   : [
        AuthGuard,
        AuthAdminGuard,
        AuthSupervisorGuard,
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [ Http, RequestOptions ]
        }
    ],

    bootstrap   : [AppComponent]
})

export class AppModule {}
