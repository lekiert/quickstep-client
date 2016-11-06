import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExcerciseListComponent } from './components/core/excercise-list/excercise-list.component';
import { Login } from './components/login';
import { AuthGuard } from './common/auth.guard';

export const rootRouterConfig: Routes = [
  { path: 'home',   component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'excercise-list',   component: ExcerciseListComponent, canActivate: [AuthGuard] },
  { path: '',       component: Login },
  { path: 'login',  component: Login },
  { path: '**',     redirectTo: '/home',  },
];
