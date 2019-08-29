import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page404threadComponent } from './page404thread.component';

describe('Page404threadComponent', () => {
  let component: Page404threadComponent;
  let fixture: ComponentFixture<Page404threadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page404threadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page404threadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
