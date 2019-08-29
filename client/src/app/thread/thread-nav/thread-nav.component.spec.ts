import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadNavComponent } from './thread-nav.component';

describe('ThreadNavComponent', () => {
  let component: ThreadNavComponent;
  let fixture: ComponentFixture<ThreadNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
