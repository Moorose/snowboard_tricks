import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { EUser, IUser } from '../model/user';
import { UserService } from '../user.service';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let userServiceSpy: any;
  let userMock: IUser;

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getUserById']);
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
  });

  afterAll(() => {
    environment.currentUser = EUser.USER;
  });

  it('should have a Component', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit()', () => {
    beforeEach(() => {
      userMock = {
        id: EUser.USER,
        nickname: 'mcTest',
        fullName: 'Test',
        email: 'test@mail.com',
        description: 'description'
      };
      userServiceSpy.getUserById.and.returnValue(of(userMock));
      fixture.detectChanges();
    });

    it('should call getUserById', () => {
      expect(userServiceSpy.getUserById.calls.count()).toBe(1);
      expect(component.user).toBe(userMock);
    });
  });

  describe('signAsUser()', () => {
    beforeEach(() => {
      userMock = {
        id: EUser.USER,
        nickname: 'mcTest',
        fullName: 'Test',
        email: 'test@mail.com',
        description: 'description'
      };
      userServiceSpy.getUserById.and.returnValue(of(userMock));
      fixture.detectChanges();
      component.signAsUser();
    });

    it('should call getUserById through getUser', () => {
      expect(userServiceSpy.getUserById.calls.count()).toBe(2);
      expect(component.user).toBe(userMock);
    });

    it('currentUser should equal user', () => {
      expect(environment.currentUser).toBe(EUser.USER);
    });
  });

  describe('signAsAdmin()', () => {
    beforeEach(() => {
      userMock = {
        id: EUser.ADMIN,
        nickname: 'mcTest',
        fullName: 'Test',
        email: 'test@mail.com',
        description: 'description'
      };
      userServiceSpy.getUserById.and.returnValue(of(userMock));
      fixture.detectChanges();
      component.signAsAdmin();
    });

    it('should call getUserById through getUser', () => {
      expect(userServiceSpy.getUserById.calls.count()).toBe(2);
      expect(component.user).toBe(userMock);
    });

    it('currentUser should be Admin', () => {
      expect(environment.currentUser).toBe(EUser.ADMIN);
    });
  });
});
