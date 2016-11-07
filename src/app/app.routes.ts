import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExcerciseListComponent } from './components/core/excercise-list/excercise-list.component';
import { CourseListComponent } from './components/core/course-list/course-list.component';
import { CourseComponent } from './components/core/course/course.component';
import { Login } from './components/login';
import { AuthGuard } from './common/auth.guard';

export const rootRouterConfig: Routes = [
  { path: 'summary',   component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'course-list',   component: CourseListComponent, canActivate: [AuthGuard] },
  { path: 'course/:id',   component: CourseComponent, canActivate: [AuthGuard] },
  { path: '',       component: Login },
  { path: 'login',  component: Login },
  { path: '**',     redirectTo: '/summary',  },
];
