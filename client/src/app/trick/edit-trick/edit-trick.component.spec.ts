import {TrickComponent} from '../trick/trick.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrickService} from '../trick.service';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {EditTrickComponent} from './edit-trick.component';
import {Trick} from '../models/trick';
import {ActivatedRoute, convertToParamMap} from '@angular/router';

describe('EditTrickComponent', () => {
  let component: EditTrickComponent;
  let fixture: ComponentFixture<EditTrickComponent>;
  let trickServiceSpy: any;
  let trickMock: Trick;

  beforeEach(() => {
    trickServiceSpy = jasmine.createSpyObj('TrickService', ['getTrickById', 'updateTrick']);
    TestBed.configureTestingModule({
      declarations: [EditTrickComponent, TrickComponent],
      providers: [
        {provide: TrickService, useValue: trickServiceSpy},
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: convertToParamMap({id: 1})}}
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

  describe('EditTrickComponent', () => {

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

    it('should valid form', () => {
      fixture.detectChanges();
      /* tslint:disable:no-string-literal */
      expect(component.trickForm.controls['name']).toEqual(trickMock.name);
      expect(component.trickForm.controls['complexity']).toEqual(trickMock.complexity);
      expect(component.trickForm.controls['description']).toEqual(trickMock.description);
      /* tslint:enable:no-string-literal */
      expect(component.trickForm.valid).toBeTruthy();
    });

    it('should call updateTrick with obj', () => {
      fixture.detectChanges();
      /* tslint:disable:no-string-literal */
      component.trickForm.controls['name'].setValue('DoubleBackFlip');
      component.trickForm.controls['complexity'].setValue(222);
      component.trickForm.controls['description'].setValue('Very Very hard');
      /* tslint:enable:no-string-literal */
      expect(component.trickForm.valid).toBeTruthy();
      component.onSubmit();
      expect(trickServiceSpy.updateTrick).toHaveBeenCalledWith(jasmine.objectContaining({
        id: trickMock.id,
        name: 'DoubleBackFlip',
        complexity: 222,
        description: 'Very Very hard'
      }));
    });
  });
});
