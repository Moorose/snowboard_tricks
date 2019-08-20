import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { TrickService } from '../trick.service';
import { TrickComponent } from '../trick/trick.component';

import { AddTrickComponent } from './add-trick.component';

describe('AddTrickComponent', () => {
  let component: AddTrickComponent;
  let fixture: ComponentFixture<AddTrickComponent>;
  let trickServiceSpy: any;
  let locationSpy: any;

  beforeEach(() => {
    trickServiceSpy = jasmine.createSpyObj('TrickService', ['addTrick']);
    locationSpy = jasmine.createSpyObj('Location', ['back']);
    TestBed.configureTestingModule({
      declarations: [AddTrickComponent, TrickComponent],
      providers: [
        { provide: TrickService, useValue: trickServiceSpy },
        { provide: Location, useValue: locationSpy }
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ]
    });

    fixture = TestBed.createComponent(AddTrickComponent);
    component = fixture.componentInstance;
  });

  describe('save()', () => {

    beforeEach(() => {
      trickServiceSpy.addTrick.and.returnValue(of({}));
    });

    it('should have a Component', () => {
      expect(component).toBeTruthy();
    });

    it('should call back()', () => {
      component.trickForm.controls.name.setValue('BackFlip');
      component.trickForm.controls.complexity.setValue(100);
      component.trickForm.controls.description.setValue('Very hard');
      component.save();
      expect(locationSpy.back.calls.count()).toBe(1);
    });

    it('should call trickService ', () => {
      expect(component.trickForm.valid).toBeFalsy();
      component.trickForm.controls.name.setValue('BackFlip');
      component.trickForm.controls.complexity.setValue(100);
      component.trickForm.controls.description.setValue('Very hard');
      expect(component.trickForm.valid).toBeTruthy();
      component.save();
      expect(trickServiceSpy.addTrick).toHaveBeenCalledWith(jasmine.objectContaining({
        name: 'BackFlip',
        complexity: 100,
        description: 'Very hard'
      }));
    });
  });

  describe('save() with wrong request', () => {

    beforeEach(() => {
      trickServiceSpy.addTrick.and.returnValue(throwError(new Error('error')));
    });

    it('should have a Component', () => {
      expect(component).toBeTruthy();
    });

    it('this.error exist after request', () => {
      component.save();
      expect(component.error).toBeTruthy();
    });
  });
});
