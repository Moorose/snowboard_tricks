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

    it('should have a Component', () => {
      expect(component).toBeTruthy();
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
    });

    it('should call updateTrick with obj', () => {
      fixture.detectChanges();
      component.trickForm.controls.name.setValue('DoubleBackFlip');
      component.trickForm.controls.complexity.setValue(222);
      component.trickForm.controls.description.setValue('Very Very hard');
      expect(component.trickForm.valid).toBeTruthy();
      component.save();
      expect(trickServiceSpy.updateTrick).toHaveBeenCalledWith(jasmine.objectContaining({
        id: trickMock.id,
        name: 'DoubleBackFlip',
        complexity: 222,
        description: 'Very Very hard'
      }));
    });

    it('should call back()', () => {
      fixture.detectChanges();
      component.trickForm.controls.name.setValue('DoubleBackFlip');
      component.trickForm.controls.complexity.setValue(222);
      component.trickForm.controls.description.setValue('Very Very hard');
      expect(component.trickForm.valid).toBeTruthy();
      component.save();
      expect(locationSpy.back.calls.count()).toBe(1);
    });

  });

  describe('save() with wrong', () => {

    beforeEach(() => {
      trickMock = {
        id: 1,
        name: 'BackFlip',
        complexity: 100,
        description: 'description',
      };
      trickServiceSpy.getTrickById.and.returnValue(of(trickMock));
      trickServiceSpy.updateTrick.and.returnValue(throwError(new Error('error')));
    });

    it('should have a Component', () => {
      expect(component).toBeTruthy();
    });

    it('this.error exist after request', () => {
      fixture.detectChanges();
      component.trickForm.controls.name.setValue('DoubleBackFlip');
      component.trickForm.controls.complexity.setValue(222);
      component.trickForm.controls.description.setValue('Very Very hard');
      expect(component.trickForm.valid).toBeTruthy();
      component.save();
      expect(component.error).toBeTruthy();
    });

  });
});
