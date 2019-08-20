import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { Trick } from '../models/trick';
import { TrickService } from '../trick.service';
import { TrickComponent } from '../trick/trick.component';

import { EditTrickComponent } from './edit-trick.component';

describe('EditTrickComponent', () => {
  let component: EditTrickComponent;
  let fixture: ComponentFixture<EditTrickComponent>;
  let trickServiceSpy: any;
  let trickMock: Trick;
  let locationSpy: any;

  beforeEach(() => {
    trickServiceSpy = jasmine.createSpyObj('TrickService', ['getTrickById', 'updateTrick']);
    locationSpy = jasmine.createSpyObj('Location', ['back']);
    TestBed.configureTestingModule({
      declarations: [EditTrickComponent, TrickComponent],
      providers: [
        { provide: TrickService, useValue: trickServiceSpy },
        { provide: Location, useValue: locationSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: 1 }) } }
        },
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(EditTrickComponent);
    component = fixture.componentInstance;
  });

  it('should have a Component', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit()', () => {

    beforeEach(() => {
      trickMock = {
        id: 1,
        name: 'BackFlip',
        complexity: 100,
        description: 'description',
      };
      trickServiceSpy.getTrickById.and.returnValue(of(trickMock));
      trickServiceSpy.updateTrick.and.returnValue(of({}));
    });

    it('should call getTrickById with 1', () => {
      fixture.detectChanges();
      expect(trickServiceSpy.getTrickById).toHaveBeenCalledWith(1);
    });

    it('should have valid form', () => {
      fixture.detectChanges();
      expect(component.trickForm.controls.name.value).toBe(trickMock.name);
      expect(component.trickForm.controls.complexity.value).toBe(trickMock.complexity);
      expect(component.trickForm.controls.description.value).toBe(trickMock.description);
      expect(component.trickForm.valid).toBeTruthy();
    });

  });

  describe('save()', () => {
    beforeEach(() => {
      trickMock = {
        id: 1,
        name: 'BackFlip',
        complexity: 100,
        description: 'description',
      };
      trickServiceSpy.getTrickById.and.returnValue(of(trickMock));
      trickServiceSpy.updateTrick.and.returnValue(of({}));
      fixture.detectChanges();
      component.trickForm.controls.name.setValue('DoubleBackFlip');
      component.trickForm.controls.complexity.setValue(222);
      component.trickForm.controls.description.setValue('Very Very hard');
    });

    it('should call updateTrick with obj', () => {
      component.save();
      expect(trickServiceSpy.updateTrick).toHaveBeenCalledWith(jasmine.objectContaining({
        id: trickMock.id,
        name: 'DoubleBackFlip',
        complexity: 222,
        description: 'Very Very hard'
      }));
    });

    describe('when update trick request is successful', () => {
      it('should call back() once', () => {
        component.save();
        expect(locationSpy.back.calls.count()).toBe(1);
      });
    });

    describe('when update trick request is failed', () => {
      beforeEach(() => {
        trickServiceSpy.updateTrick.and.returnValue(throwError(new Error('error')));
      });

      it('should set error', () => {
        component.save();
        expect(component.error).toBeTruthy();
      });
    });
  });

  describe('goBack()', () => {

    it('when call, it should call back()', () => {
      component.goBack();
      expect(locationSpy.back.calls.count()).toBe(1);
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
