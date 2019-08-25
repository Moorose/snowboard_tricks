import { of } from 'rxjs';

import { ILevel } from './model/level';
import { IUser } from './model/user';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let httpClientSpy: any;

  describe('getUserList()', () => {
    let userMock: IUser[];

    beforeAll(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      userMock = [{
        id: 1, nickname: 'mcTest', fullName: 'Test', email: 'test@mail.com', description: 'description'
      }];
      httpClientSpy.get.and.returnValue(of(userMock));
      userService = new UserService(httpClientSpy);
    });

    it('should return object list', () => {
      userService.getUserList().subscribe(result => expect(result).toEqual(userMock));
      expect(httpClientSpy.get.calls.count()).toBe(1);
    });
  });

  describe('getUserById()', () => {
    let userMock: IUser;

    beforeEach(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      userMock = {
        id: 1, nickname: 'mcTest', fullName: 'Test', email: 'test@mail.com', description: 'description'
      };
      httpClientSpy.get.and.returnValue(of(userMock));
      userService = new UserService(httpClientSpy);
    });

    describe('call with id', () => {
      it('should return user by id', () => {
        userService.getUserById(1).subscribe(result => expect(result).toEqual(userMock));
        expect(httpClientSpy.get.calls.count()).toBe(1);
        expect(httpClientSpy.get).toHaveBeenCalledWith('http://localhost:3000/user/1');
      });
    });

    describe('call without id', () => {
      it('should return user without id', () => {
        userService.getUserById().subscribe(result => expect(result).toEqual(userMock));
        expect(httpClientSpy.get.calls.count()).toBe(1);
        expect(httpClientSpy.get).toHaveBeenCalledWith('http://localhost:3000/user/1');
      });
    });
  });

  describe('getUserLevel()', () => {
    let levelMock: ILevel;

    beforeEach(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      levelMock = {
        level: 5, exp: 5000, nextExp: 6000
      };
      httpClientSpy.get.and.returnValue(of(levelMock));
      userService = new UserService(httpClientSpy);
    });

    describe('call with id', () => {
      it('should return level by id', () => {
        userService.getUserLevel(1).subscribe(result => expect(result).toEqual(levelMock));
        expect(httpClientSpy.get.calls.count()).toBe(1);
        expect(httpClientSpy.get).toHaveBeenCalledWith('http://localhost:3000/grade/user/1/level');
      });
    });

    describe('call without id', () => {
      it('should return level without id', () => {
        userService.getUserLevel().subscribe(result => expect(result).toEqual(levelMock));
        expect(httpClientSpy.get.calls.count()).toBe(1);
        expect(httpClientSpy.get).toHaveBeenCalledWith('http://localhost:3000/grade/user/1/level');
      });
    });
  });

  describe('createUser()', () => {

    let userMock: IUser;
    let userMockWithoutId: IUser;

    beforeAll(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
      userMock = {
        id: 1, nickname: 'mcTest', fullName: 'Test', email: 'test@mail.com', description: 'description'
      };
      userMockWithoutId = {
        nickname: 'mcTest', fullName: 'Test', email: 'test@mail.com', description: 'description'
      };
      httpClientSpy.post.and.returnValue(of(userMock));
      userService = new UserService(httpClientSpy);
    });

    it('should return user with id', () => {
      userService.createUser(userMockWithoutId).subscribe(result => expect(result).toEqual(userMock));
      expect(httpClientSpy.post.calls.count()).toBe(1);
      expect(httpClientSpy.post).toHaveBeenCalledWith('http://localhost:3000/user', userMockWithoutId);
    });
  });

  describe('updateUser()', () => {
    let userMock: IUser;

    beforeAll(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['patch']);
      userMock = {
        id: 1, nickname: 'mcTest', fullName: 'Test', email: 'test@mail.com', description: 'description'
      };
      httpClientSpy.patch.and.returnValue(of());
      userService = new UserService(httpClientSpy);
    });

    it('should called with mock', () => {
      userService.updateUser(userMock);
      expect(httpClientSpy.patch.calls.count()).toBe(1);
      expect(httpClientSpy.patch).toHaveBeenCalledWith('http://localhost:3000/user', userMock);
    });
  });

  describe('deleteUserById()', () => {

    beforeAll(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['delete']);
      httpClientSpy.delete.and.returnValue(of());
      userService = new UserService(httpClientSpy);
    });

    it('should called with mock', () => {
      userService.deleteUserById(1);
      expect(httpClientSpy.delete.calls.count()).toBe(1);
      expect(httpClientSpy.delete).toHaveBeenCalledWith('http://localhost:3000/user/1');
    });
  });

});
