import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ILevel } from '../model/level';
import { IUser } from '../model/user';
import { UserService } from '../user.service';

import { UserPageComponent } from './user-page.component';

describe('UserPageComponent', () => {
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;
  let userServiceSpy: any;
  let userMock: IUser;
  let levelMock: ILevel;

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getUserById', 'getUserLevel']);
    TestBed.configureTestingModule({
      declarations: [UserPageComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
  });

  it('should have a Component', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit()', () => {
    beforeEach(() => {
      userMock = { id: 1, nickname: 'mcTest', fullName: 'Test', email: 'test@mail.com', description: 'description' };
      levelMock = { level: 5, exp: 5000, nextExp: 6000 };
      userServiceSpy.getUserById.and.returnValue(of(userMock));
      userServiceSpy.getUserLevel.and.returnValue(of(levelMock));
      fixture.detectChanges();
    });

    it('should call getUserById', () => {
      expect(userServiceSpy.getUserById.calls.count()).toBe(1);
      expect(component.user).toBe(userMock);
    });

    it('should call getUserLevel', () => {
      expect(userServiceSpy.getUserLevel.calls.count()).toBe(1);
      expect(component.level).toBe(levelMock);
    });

  });

});
