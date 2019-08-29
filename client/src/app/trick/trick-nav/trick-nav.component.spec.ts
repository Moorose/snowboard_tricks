import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrickNavComponent } from './trick-nav.component';

describe('TrickNavComponent', () => {
  let component: TrickNavComponent;
  let fixture: ComponentFixture<TrickNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrickNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrickNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
