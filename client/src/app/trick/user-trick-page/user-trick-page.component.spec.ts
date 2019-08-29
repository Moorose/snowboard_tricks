import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrickPageComponent } from './user-trick-page.component';

describe('UserTrickPageComponent', () => {
  let component: UserTrickPageComponent;
  let fixture: ComponentFixture<UserTrickPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTrickPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTrickPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
