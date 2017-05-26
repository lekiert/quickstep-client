import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ExerciseFormModule} from "./exercise-forms/exercise-form.module";
import {ExerciseListComponent} from "./exercise-list/exercise-list.component";
import {StudentBracketsComponent} from "./student-exercises/brackets/student-brackets.component";
import {StudentChoiceComponent} from "./student-exercises/choice/student-choice.component";
import {ExerciseFormComponent} from "./exercise-forms/exercise-form.component";
import {UtilModule} from "../../util/util.module";


@NgModule({
    imports: [ CommonModule, FormsModule, ExerciseFormModule, UtilModule ],
    declarations: [ ExerciseListComponent, StudentBracketsComponent, StudentChoiceComponent ],
    exports: [ ExerciseListComponent, StudentBracketsComponent, StudentChoiceComponent, ExerciseFormComponent ]
})
export class ExerciseModule { }
