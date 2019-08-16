import { TrickComponent } from './../trick/trick.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrickListComponent } from './trick-list.component';
import { TrickService } from '../trick.service';
import { Trick } from '../models/trick';
import { of, throwError } from 'rxjs';

describe('TrickListComponent', () => {
  let component: TrickListComponent;
  let quoteEl: HTMLElement;
  let fixture: ComponentFixture<TrickListComponent>;
  let trickServiceSpy: any;

  beforeEach(() => {
    trickServiceSpy = jasmine.createSpyObj('TrickService', ['getTrickList']);

    TestBed.configureTestingModule({
      declarations: [TrickListComponent, TrickComponent],
      providers: [{ provide: TrickService, useValue: trickServiceSpy }],
    });

    fixture = TestBed.createComponent(TrickListComponent);
    component = fixture.componentInstance;
    quoteEl = fixture.nativeElement.querySelector('.tricks');
  });

  describe('with tricks', () => {
    beforeEach(() => {
      const trickMock: Trick[] = [
        {
          id: 1,
          name: 'BackFlip',
          complexity: 100,
          description: 'description',
        },
      ];
      trickServiceSpy.getTrickList.and.returnValue(
        of(trickMock),
      );
    });

    it('should have a Component', () => {
      expect(component).toBeTruthy();
    });

    it('should show div with trick after component initialized', () => {
      fixture.detectChanges();
      expect(quoteEl.textContent).toBe('1BackFlip100description');
      expect(trickServiceSpy.getTrickList.calls.any()).toBe(true);
    });

    it('should show div with error after component initialized', () => {
      trickServiceSpy.getTrickList.and.returnValue(
        throwError(new Error('error'))
      );
      fixture.detectChanges();
      expect(quoteEl.textContent).toBe('error');
      expect(trickServiceSpy.getTrickList.calls.any()).toBe(true);
    });
  });

  describe('without tricks', () => {
    beforeEach(() => {
      const trickMock: Trick[] = [];
      trickServiceSpy.getTrickList.and.returnValue(
        of(trickMock),
      );
    });

    it('should have a Component', () => {
      expect(component).toBeTruthy();
    });

    it('should show div with message after component initialized', () => {
      fixture.detectChanges();
      expect(quoteEl.textContent).toBe('Tricks was not found!');
      expect(trickServiceSpy.getTrickList.calls.any()).toBe(true);
    });
  });
});
