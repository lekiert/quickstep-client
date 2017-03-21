/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from "@angular/forms";
import { FileUploadComponent } from './file-upload.component';
import { provideAuth } from 'angular2-jwt';
import { environment } from 'environments/environment';
import { HttpModule } from "@angular/http";

describe('FileUploadComponent', () => {
    let component: FileUploadComponent;
    let fixture: ComponentFixture<FileUploadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule, HttpModule ],
            declarations: [ FileUploadComponent ],
            providers: [ provideAuth({
                tokenName: environment.TOKEN_NAME,
                tokenGetter: () => localStorage.getItem(environment.TOKEN_NAME)
            }) ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FileUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
