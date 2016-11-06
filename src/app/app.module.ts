import { NgModule } from '@angular/core'
import { RouterModule } from "@angular/router";
import { rootRouterConfig } from "./app.routes";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { ExcerciseListComponent } from "./components/core/excercise-list/excercise-list.component";
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './common/auth.guard';
import { Login } from './components/login';
import { provideAuth } from 'angular2-jwt';
import { ExcerciseService } from './services/excercise.service';
import { contentHeaders } from './common/headers';

@NgModule({
  declarations: [AppComponent, HomeComponent, ExcerciseListComponent, Login],
  imports     : [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(rootRouterConfig)],
  providers   : [AuthGuard, ExcerciseService, provideAuth({
      tokenName: 'jwt',
      tokenGetter: () => localStorage.getItem('jwt') // tmp bug in angular2-jwt fix
    })],
  bootstrap   : [AppComponent]
})
export class AppModule {}
