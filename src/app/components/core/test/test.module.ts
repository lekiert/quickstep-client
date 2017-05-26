import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {TestComponent} from "./test.component";
import {AddTestComponent} from "./add-test/add-test.component";
import {EditTestComponent} from "./edit-test/edit-test.component";
import {ExerciseModule} from "../exercise/exercise.module";
import {UtilModule} from "../../util/util.module";
import {RouterModule} from "@angular/router";


@NgModule({
    imports: [ CommonModule, FormsModule, ExerciseModule, UtilModule, RouterModule ],
    declarations: [ TestComponent, AddTestComponent, EditTestComponent ],
    exports: [ TestComponent, AddTestComponent, EditTestComponent ]
})
export class TestModule { }
