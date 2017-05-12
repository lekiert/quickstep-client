import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {AddGroupComponent} from "./add-group/add-group.component";
import {EditGroupComponent} from "./edit-group/edit-group.component";
import {GroupListComponent} from "./group-list/group-list.component";
import {RouterModule} from "@angular/router";
import {UtilModule} from "../../util/util.module";


@NgModule({
    imports: [ CommonModule, FormsModule, RouterModule, UtilModule ],
    declarations: [ AddGroupComponent, EditGroupComponent, GroupListComponent ],
    exports: [ AddGroupComponent, EditGroupComponent, GroupListComponent ]
})
export class GroupModule { }
