import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTrickComponent } from './my-trick.component';

describe('MyTrickComponent', () => {
  let component: MyTrickComponent;
  let fixture: ComponentFixture<MyTrickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTrickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTrickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
