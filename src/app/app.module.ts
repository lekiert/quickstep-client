import {NgModule} from '@angular/core'
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {HomeComponent} from './home/home.component';
import {AUTH_PROVIDERS} from 'angular2-jwt';
import { AuthGuard } from './common/auth.guard';
import { Login } from './login';
import { provideAuth } from 'angular2-jwt';

@NgModule({
  declarations: [AppComponent, HomeComponent, Login],
  imports     : [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(rootRouterConfig)],
  providers   : [AuthGuard, provideAuth({
      tokenName: 'jwt',
    }), ...AUTH_PROVIDERS],
  bootstrap   : [AppComponent]
})
export class AppModule {}
