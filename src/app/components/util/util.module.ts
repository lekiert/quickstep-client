import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {SearchFieldComponent} from "./search-field/search-field.component";
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [ CommonModule, FormsModule ],
    declarations: [ SearchFieldComponent, FileUploadComponent ],
    exports: [ SearchFieldComponent, FileUploadComponent ]
})
export class UtilModule {
}