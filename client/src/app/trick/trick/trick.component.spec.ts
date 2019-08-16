import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrickComponent } from './trick.component';
import { Trick } from '../models/trick';

describe('TrickComponent', () => {
  let component: TrickComponent;
  let quoteEl: HTMLElement;
  let fixture: ComponentFixture<TrickComponent>;
  let trickMock: Trick;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrickComponent],
    });

    trickMock = {
      id: 1,
      name: 'BackFlip',
      complexity: 100,
      description: 'description',
    };

    fixture = TestBed.createComponent(TrickComponent);
    component = fixture.componentInstance;
    component.trick = trickMock;
    fixture.detectChanges();
    quoteEl = fixture.nativeElement.querySelector('div');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show div with trick after component initialized', () => {
    expect(quoteEl.textContent.replace(/\s\s+/g, ' ')).toBe(
      '1BackFlip100description',
    );
  });
});
