import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {BracketsFormComponent} from "./brackets/brackets-form.component";
import {ChoiceFormComponent} from "./choice/choice-form.component";
import {ExerciseFormComponent} from "./exercise-form.component";
import {ExerciseFormService} from "./exercise-form.service";
import {UtilModule} from "../../../util/util.module";
import {FormsModule} from "@angular/forms";


@NgModule({
    imports: [ CommonModule, UtilModule, FormsModule ],
    declarations: [ ExerciseFormComponent, BracketsFormComponent, ChoiceFormComponent ],
    entryComponents: [BracketsFormComponent, ChoiceFormComponent],
    providers: [ ExerciseFormService ],
    exports: [ ExerciseFormComponent ]
})
export class ExerciseFormModule {
}