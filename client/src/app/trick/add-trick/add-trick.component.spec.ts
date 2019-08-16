import { TrickComponent } from './../trick/trick.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrickService } from '../trick.service';
import { AddTrickComponent } from './add-trick.component';

describe('AddTrickComponent', () => {
    let component: AddTrickComponent;
    let fixture: ComponentFixture<AddTrickComponent>;
    let trickServiceSpy: any;

    beforeEach(() => {
        trickServiceSpy = jasmine.createSpyObj('TrickService', ['addTrick']);

        TestBed.configureTestingModule({
            declarations: [AddTrickComponent, TrickComponent],
            providers: [{ provide: TrickService, useValue: trickServiceSpy }],
        });

        fixture = TestBed.createComponent(AddTrickComponent);
        component = fixture.componentInstance;
    });

    describe('', () => {

        it('should have a Component', () => {
            expect(component).toBeTruthy();
        });

        it('save() should call trickService ', () => {
            component.save();
            expect(trickServiceSpy.addTrick.calls.any()).toBe(true);
        });

        it('save() should call trickService ', () => {
            expect(component.trickForm.valid).toBeFalsy();
            component.trickForm.controls['name'].setValue("BackFlip");
            component.trickForm.controls['complexity'].setValue(100);
            component.trickForm.controls['description'].setValue("Very hard");
            expect(component.trickForm.valid).toBeTruthy();
            component.trickForm.value = {
                name: 'BackFlip',
                complexity: 100,
                description: 'description',
            };
            component.save();
            expect(trickServiceSpy.addTrick.calls.any()).toBe(true);
        });
    });
});
