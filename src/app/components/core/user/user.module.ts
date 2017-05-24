import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {AddUserComponent} from "./add-user/add-user.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {SettingsComponent} from "./settings/settings.component";
import {StatsComponent} from "./stats/stats.component";
import {UserListComponent} from "./user-list/user-list.component";
import {StudentGroupsComponent} from "./student/student-groups/student-groups.component";
import {SettingsService} from "./settings/settings.service";
import {RouterModule} from "@angular/router";
import {ChartsModule} from "ng2-charts";
import {GroupModule} from "../group/group.module";
import { UserActionListComponent } from './stats/user-action-list/user-action-list.component';


@NgModule({
    imports: [ CommonModule, FormsModule, RouterModule, ChartsModule, GroupModule ],
    declarations: [ AddUserComponent, EditUserComponent, SettingsComponent, StatsComponent, UserListComponent,
        StudentGroupsComponent, UserActionListComponent ],
    exports: [ AddUserComponent, EditUserComponent, SettingsComponent, StatsComponent, UserListComponent,
        StudentGroupsComponent ],
    providers: [ SettingsService ]
})
export class UserModule { }
