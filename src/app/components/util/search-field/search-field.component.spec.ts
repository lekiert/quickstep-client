/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from "@angular/forms";
import { SearchFieldComponent } from './search-field.component';
import { provideAuth } from 'angular2-jwt';
import { environment } from '../../../../environments/environment';
import { HttpModule } from "@angular/http";

describe('SearchFieldComponent', () => {
    let component: SearchFieldComponent;
    let fixture: ComponentFixture<SearchFieldComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule, HttpModule ],
            declarations: [ SearchFieldComponent ],
            providers: [ provideAuth({
                tokenName: environment.TOKEN_NAME,
                tokenGetter: () => localStorage.getItem(environment.TOKEN_NAME)
            }) ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
