import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page404trickComponent } from './page404trick.component';

describe('Page404trickComponent', () => {
  let component: Page404trickComponent;
  let fixture: ComponentFixture<Page404trickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page404trickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page404trickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
