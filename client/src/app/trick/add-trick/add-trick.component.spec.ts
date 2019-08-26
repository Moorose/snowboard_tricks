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

  it('should have a Component', () => {
    expect(component).toBeTruthy();
  });

  describe('goBack()', () => {
    it('when call, it should call back()', () => {
      component.goBack();
      expect(locationSpy.back.calls.count()).toBe(1);
    });
  });

  describe('save()', () => {
    beforeEach(() => {
      trickServiceSpy.addTrick.and.returnValue(of({}));
      component.trickForm.controls.name.setValue('BackFlip');
      component.trickForm.controls.complexity.setValue(100);
      component.trickForm.controls.description.setValue('Very hard');
    });

    it('should call trickService', () => {
      component.save();
      expect(trickServiceSpy.addTrick).toHaveBeenCalledWith(jasmine.objectContaining({
        name: 'BackFlip',
        complexity: 100,
        description: 'Very hard'
      }));
    });

    describe('when adding tricks request is successful', () => {
      it('should call back()', () => {
        component.save();
        expect(locationSpy.back.calls.count()).toBe(1);
      });
    });

    describe('when adding tricks request is failed', () => {
      beforeEach(() => {
        trickServiceSpy.addTrick.and.returnValue(throwError(new Error('error')));
      });

      it('should set error', () => {
        component.save();
        expect(component.error).toBeTruthy();
      });
    });
  });

  describe('form validation', () => {
    it('is not passed when all fields are empty', () => {
      expect(component.trickForm.valid).toBeFalsy();
    });

    it('is passed when all fields are correctly set', () => {
      component.trickForm.controls.name.setValue('BackFlip');
      component.trickForm.controls.complexity.setValue(100);
      component.trickForm.controls.description.setValue('Very hard');
      expect(component.trickForm.valid).toBeTruthy();
    });
  });
});
