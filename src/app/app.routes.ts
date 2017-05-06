import { Routes } from '@angular/router';
import { CourseListComponent } from './components/core/course/course-list/course-list.component';
import { UserListComponent } from './components/core/user/user-list/user-list.component';
import { GroupListComponent } from './components/core/group/group-list/group-list.component';
import { CourseComponent } from './components/core/course/course.component';
import { SettingsComponent } from './components/core/user/settings/settings.component';
import { AddUserComponent } from './components/core/user/add-user/add-user.component';
import { AddTestComponent } from './components/core/test/add-test/add-test.component';
import { AddCourseComponent } from './components/core/course/add-course/add-course.component';
import { AddGroupComponent } from './components/core/group/add-group/add-group.component';
import { EditUserComponent } from './components/core/user/edit-user/edit-user.component';
import { EditGroupComponent } from './components/core/group/edit-group/edit-group.component';
import { EditTestComponent } from './components/core/test/edit-test/edit-test.component';
import { TestComponent } from './components/core/test/test.component';
import { StatsComponent } from './components/core/user/stats/stats.component';
import { AnswerComponent } from './components/core/answer/answer.component';
import { AnswerListComponent } from './components/core/answer/answer-list/answer-list.component';
import { Login } from './components/login';
import { AuthGuard } from './common/auth.guard';
import { AuthAdminGuard } from './common/auth-admin.guard';
import { AuthSupervisorGuard } from './common/auth-supervisor.guard';
import { StudentGroupsComponent } from "./components/core/user/student/student-groups/student-groups.component";

export const rootRouterConfig: Routes = [
  { path: 'summary',   component: StatsComponent, canActivate: [AuthGuard] },
  { path: 'statistics',   component: StatsComponent, canActivate: [AuthGuard] },
  { path: 'settings',   component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'groups',   component: StudentGroupsComponent, canActivate: [AuthGuard] },
  { path: 'groups/new',   component: AddGroupComponent, canActivate: [AuthGuard, AuthAdminGuard] },
  { path: 'groups/:id/edit',   component: EditGroupComponent, canActivate: [AuthGuard, AuthSupervisorGuard] },
  { path: 'users/new',   component: AddUserComponent, canActivate: [AuthGuard, AuthAdminGuard] },
  { path: 'users/:id/edit',   component: EditUserComponent, canActivate: [AuthGuard, AuthAdminGuard] },
  { path: 'users/:id/results',   component: AnswerListComponent, canActivate: [AuthGuard] },
  { path: 'users/:id/statistics',   component: StatsComponent, canActivate: [AuthGuard] },
  { path: 'users/:id/groups',   component: StudentGroupsComponent, canActivate: [AuthGuard] },
  { path: 'users/:type',   component: UserListComponent, canActivate: [AuthGuard, AuthSupervisorGuard] },
  { path: 'courses/new',   component: AddCourseComponent, canActivate: [AuthGuard, AuthAdminGuard] },
  { path: 'courses',   component: CourseListComponent, canActivate: [AuthGuard] },
  { path: 'course/:id/tests/new',   component: AddTestComponent, canActivate: [AuthGuard, AuthAdminGuard] },
  { path: 'course/:id',   component: CourseComponent, canActivate: [AuthGuard] },
  { path: 'answer/:id',   component: AnswerComponent, canActivate: [AuthGuard] },
  { path: 'tests/:id/edit',   component: EditTestComponent, canActivate: [AuthGuard, AuthAdminGuard] },
  { path: 'test/:id',   component: TestComponent, canActivate: [AuthGuard] },
  { path: '',       component: Login },
  { path: 'login',  component: Login },
  { path: '**',     redirectTo: '/summary',  },
];
