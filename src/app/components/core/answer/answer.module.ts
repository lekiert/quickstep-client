import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {AnswerComponent} from "./answer.component";
import {AnswerListComponent} from "./answer-list/answer-list.component";
import {ExerciseModule} from "../exercise/exercise.module";
import {RouterModule} from "@angular/router";
import {UtilModule} from "../../util/util.module";


@NgModule({
    imports: [ CommonModule, FormsModule, ExerciseModule, RouterModule, UtilModule ],
    declarations: [ AnswerComponent, AnswerListComponent ],
    exports: [ AnswerComponent, AnswerListComponent ]
})
export class AnswerModule { }
