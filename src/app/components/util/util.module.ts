import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {SearchFieldComponent} from "./search-field/search-field.component";
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {FormsModule} from "@angular/forms";
import { ScoreCircleComponent } from './score-circle/score-circle.component';
import { QAudioComponent } from './qaudio/qaudio.component';

@NgModule({
    imports: [ CommonModule, FormsModule ],
    declarations: [ SearchFieldComponent, FileUploadComponent, ScoreCircleComponent, QAudioComponent ],
    exports: [ SearchFieldComponent, FileUploadComponent, ScoreCircleComponent, QAudioComponent ]
})
export class UtilModule {
}