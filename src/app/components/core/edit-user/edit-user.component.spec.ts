/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditUserComponent} from './edit-user.component';
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { UserService } from "app/services/user.service";
import { provideAuth } from "angular2-jwt";
import { environment } from "environments/environment";
import { HttpModule } from "@angular/http";


describe('EditUserComponent', () => {
    let component: EditUserComponent;
    let fixture: ComponentFixture<EditUserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule, RouterTestingModule, HttpModule ],
            declarations: [ EditUserComponent ],
            providers: [ UserService, provideAuth({
                tokenName: environment.TOKEN_NAME,
                tokenGetter: () => localStorage.getItem(environment.TOKEN_NAME)
            }) ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
