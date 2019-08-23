import { of } from 'rxjs';

import { environment } from '../../environments/environment';
import { ITrick } from '../trick/models/trick';
import { IUser } from '../user/model/user';
import { IUserTrick } from '../user/model/userTrick';

import { UserTrickService } from './user-trick.service';

describe('UserTrickService', () => {
  let userTrickService: UserTrickService;
  let httpClientSpy: any;
  let userTrickMock: IUserTrick;
  let trickMockMas: ITrick[];
  let userMockMas: IUser[];
  const url = environment.apiUrl;

  describe('getTrickListByUserId()', () => {
    beforeAll(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      trickMockMas = [{ id: 1, name: 'testTrick', complexity: 500, description: 'description' }];
      httpClientSpy.get.and.returnValue(of(trickMockMas));
      userTrickService = new UserTrickService(httpClientSpy);
    });

    it('should return trick list', () => {
      userTrickService.getTrickListByUserId().subscribe(result => expect(result).toEqual(trickMockMas));
      expect(httpClientSpy.get.calls.count()).toBe(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith(`${url}/user/1/tricks`);
    });
  });

  describe('getUserListByTrickId()', () => {
    beforeAll(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      userMockMas = [{
        id: 1,
        nickname: 'mcTest',
        fullName: 'Test',
        email: 'test@mail.com',
        description: 'description'
      }];
      httpClientSpy.get.and.returnValue(of(userMockMas));
      userTrickService = new UserTrickService(httpClientSpy);
    });

    it('should return user list', () => {
      userTrickService.getUserListByTrickId(1).subscribe(result => expect(result).toEqual(userMockMas));
      expect(httpClientSpy.get.calls.count()).toBe(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith(`${url}/tricks/users/1`);
    });
  });

  describe('joinTrickToUser()', () => {
    describe('call without user id', () => {
      beforeAll(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
        userTrickMock = {
          id: 1,
          is_done: true,
          TrickId: 1,
          UserId: 1
        };
        httpClientSpy.post.and.returnValue(of(userTrickMock));
        userTrickService = new UserTrickService(httpClientSpy);
      });

      it('should return IUserTrick object', () => {
        userTrickService.joinTrickToUser(1).subscribe(result => expect(result).toEqual(userTrickMock));
        expect(httpClientSpy.post.calls.count()).toBe(1);
        expect(httpClientSpy.post).toHaveBeenCalledWith(`${url}/user/1/tricks/1`, {});
      });
    });

    describe('call with user id', () => {
      beforeAll(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
        userTrickMock = {
          id: 1,
          is_done: true,
          TrickId: 2,
          UserId: 2
        };
        httpClientSpy.post.and.returnValue(of(userTrickMock));
        userTrickService = new UserTrickService(httpClientSpy);
      });

      it('should return IUserTrick object', () => {
        userTrickService.joinTrickToUser(2, 2).subscribe(result => expect(result).toEqual(userTrickMock));
        expect(httpClientSpy.post.calls.count()).toBe(1);
        expect(httpClientSpy.post).toHaveBeenCalledWith(`${url}/user/2/tricks/2`, {});
      });
    });
  });

  describe('unJoinTrickToUser()', () => {
    describe('call without user id', () => {
      beforeAll(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['delete']);
        httpClientSpy.delete.and.returnValue(of());
        userTrickService = new UserTrickService(httpClientSpy);
      });

      it('should return undefined', () => {
        userTrickService.unJoinTrickToUser(1).subscribe(result => expect(result).toBeUndefined());
        expect(httpClientSpy.delete.calls.count()).toBe(1);
        expect(httpClientSpy.delete).toHaveBeenCalledWith(`${url}/user/1/tricks/1`);
      });
    });

    describe('call with user id', () => {
      beforeAll(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['delete']);
        httpClientSpy.delete.and.returnValue(of());
        userTrickService = new UserTrickService(httpClientSpy);
      });

      it('should return undefined', () => {
        userTrickService.unJoinTrickToUser(2, 2).subscribe(result => expect(result).toBeUndefined());
        expect(httpClientSpy.delete.calls.count()).toBe(1);
        expect(httpClientSpy.delete).toHaveBeenCalledWith(`${url}/user/2/tricks/2`);
      });
    });
  });

  describe('markTrick()', () => {
    describe('call without user id', () => {
      beforeAll(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['patch']);
        userTrickMock = {
          id: 1,
          is_done: true,
          TrickId: 1,
          UserId: 1
        };
        httpClientSpy.patch.and.returnValue(of(userTrickMock));
        userTrickService = new UserTrickService(httpClientSpy);
      });

      it('should return undefined', () => {
        userTrickService.markTrick(true, 1).subscribe(result => expect(result).toEqual(userTrickMock));
        expect(httpClientSpy.patch.calls.count()).toBe(1);
        expect(httpClientSpy.patch).toHaveBeenCalledWith(`${url}/user/1/tricks/1/mark`, { is_done: true });
      });
    });

    describe('call with user id', () => {
      beforeAll(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['patch']);
        userTrickMock = {
          id: 1,
          is_done: true,
          TrickId: 1,
          UserId: 1
        };
        httpClientSpy.patch.and.returnValue(of(userTrickMock));
        userTrickService = new UserTrickService(httpClientSpy);
      });

      it('should return IUserTrick object', () => {
        userTrickService.markTrick(true, 2, 2).subscribe(result => expect(result).toEqual(userTrickMock));
        expect(httpClientSpy.patch.calls.count()).toBe(1);
        expect(httpClientSpy.patch).toHaveBeenCalledWith(`${url}/user/2/tricks/2/mark`, { is_done: true });
      });
    });
  });

});
