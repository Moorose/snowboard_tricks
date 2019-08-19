import {TrickComponent} from '../trick/trick.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrickService} from '../trick.service';
import {AddTrickComponent} from './add-trick.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';

describe('AddTrickComponent', () => {
    let component: AddTrickComponent;
    let fixture: ComponentFixture<AddTrickComponent>;
    let trickServiceSpy: any;

    beforeEach(() => {
        trickServiceSpy = jasmine.createSpyObj('TrickService', ['addTrick']);

        TestBed.configureTestingModule({
            declarations: [AddTrickComponent, TrickComponent],
            providers: [{ provide: TrickService, useValue: trickServiceSpy }],
            imports: [
                ReactiveFormsModule,
                RouterTestingModule
            ]
        });
        trickServiceSpy.addTrick.and.returnValue(of({}));
        fixture = TestBed.createComponent(AddTrickComponent);
        component = fixture.componentInstance;
    });

    describe('', () => {

        it('should have a Component', () => {
            expect(component).toBeTruthy();
        });

        it('save() should call trickService ', () => {
            expect(component.trickForm.valid).toBeFalsy();
        /* tslint:disable:no-string-literal */
            component.trickForm.controls['name'].setValue('BackFlip');
            component.trickForm.controls['complexity'].setValue(100);
            component.trickForm.controls['description'].setValue('Very hard');
        /* tslint:enable:no-string-literal */
            expect(component.trickForm.valid).toBeTruthy();
            component.save();
            expect(trickServiceSpy.addTrick).toHaveBeenCalledWith(jasmine.objectContaining({
                name: 'BackFlip',
                complexity: 100,
                description: 'Very hard'
            }));
        });
    });
});
