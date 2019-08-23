import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrickPageComponent } from './trick-page.component';

describe('TrickPageComponent', () => {
  let component: TrickPageComponent;
  let fixture: ComponentFixture<TrickPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrickPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrickPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
