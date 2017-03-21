/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditUserComponent} from './edit-user.component';
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { UserService } from "app/services/user.service";
import {provideAuth, AuthHttp} from "angular2-jwt";
import { environment } from "environments/environment";
import { HttpModule } from "@angular/http";
import { User } from "../../../user";

describe('EditUserComponent', () => {

    let userService: UserService;
    let component: EditUserComponent;
    let fixture: ComponentFixture<EditUserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule, RouterTestingModule, HttpModule ],
            declarations: [ EditUserComponent ],
            providers: [ UserService,  provideAuth({
                tokenName: environment.TOKEN_NAME,
                tokenGetter: () => localStorage.getItem(environment.TOKEN_NAME)
            }) ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditUserComponent);
        component = fixture.componentInstance;
        userService = fixture.debugElement.injector.get(UserService);
        component.user = new User(1, { password: '' })

        spyOn(userService, 'changeUserPassword').and.returnValue(Promise.resolve({}));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should provide a password when attepting to change', () => {
        component.user.password = '';
        component.changePassword();
        expect(component.changePasswordError).toBe('Musisz podać nowe hasło.');
    });


    it('should provide a repeated password', () => {
        component.user.password = 'secret';
        component.password_repeat = '';
        component.changePassword();
        expect(component.changePasswordError).toBe('Musisz powtórzyć nowe hasło.');
    });

    it('should accept a password only if it is repeated', () => {
        component.user.password = 'secret1';
        component.password_repeat = 'secret1';
        let result = component.changePassword();
        expect(result).toBeTruthy();
    });

    it('should not accept a password if repeated is not the same', () => {
        component.user.password = 'secret1';
        component.password_repeat = 'secret2';
        let result = component.changePassword();
        expect(component.changePasswordError).toBe('Musisz powtórzyć takie samo hasło.');
        expect(result).toBeFalsy();
    });

    it('should not accept a password if repeated is not the same', () => {
        component.user.password = 'secret1';
        component.password_repeat = 'secret2';
        let result = component.changePassword();
        expect(component.changePasswordError).toBe('Musisz powtórzyć takie samo hasło.');
        expect(result).toBeFalsy();
    });

    it('should erase password fields', () => {
        component.user.password = 'secret1';
        component.password_repeat = 'secret2';
        component.clearGeneratedPassword();
        expect(component.user.password).toBe('');
        expect(component.password_repeat).toBe('');
    });
});
