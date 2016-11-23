import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExcerciseListComponent } from './components/core/excercise-list/excercise-list.component';
import { CourseListComponent } from './components/core/course-list/course-list.component';
import { UserListComponent } from './components/core/user-list/user-list.component';
import { GroupListComponent } from './components/core/group-list/group-list.component';
import { CourseComponent } from './components/core/course/course.component';
import { SettingsComponent } from './components/core/settings/settings.component';
import { AddUserComponent } from './components/core/add-user/add-user.component';
import { AddGroupComponent } from './components/core/add-group/add-group.component';
import { EditUserComponent } from './components/core/edit-user/edit-user.component';
import { EditGroupComponent } from './components/core/edit-group/edit-group.component';
import { TestComponent } from './components/core/test/test.component';
import { Login } from './components/login';
import { AuthGuard } from './common/auth.guard';

export const rootRouterConfig: Routes = [
  { path: 'summary',   component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'settings',   component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'groups',   component: GroupListComponent, canActivate: [AuthGuard] },
  { path: 'groups/new',   component: AddGroupComponent, canActivate: [AuthGuard] },
  { path: 'groups/:id/edit',   component: EditGroupComponent, canActivate: [AuthGuard] },
  { path: 'users/new',   component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'users/:id/edit',   component: EditUserComponent, canActivate: [AuthGuard] },
  { path: 'users/:type',   component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'courses',   component: CourseListComponent, canActivate: [AuthGuard] },
  { path: 'course/:id',   component: CourseComponent, canActivate: [AuthGuard] },
  { path: 'test/:id',   component: TestComponent, canActivate: [AuthGuard] },
  { path: '',       component: Login },
  { path: 'login',  component: Login },
  { path: '**',     redirectTo: '/summary',  },
];
