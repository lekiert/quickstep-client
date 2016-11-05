import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Login } from './login';
import { AuthGuard } from './common/auth.guard';

export const rootRouterConfig: Routes = [
  { path: 'home',   component: HomeComponent, canActivate: [AuthGuard] },
  { path: '',       component: Login },
  { path: 'login',  component: Login },
  { path: '**',     component: Login },
];
