import { of } from 'rxjs';

import { environment } from '../../environments/environment';
import { ITrick } from '../trick/models/trick';
import { IUser } from '../user/model/user';

import { GradeService } from './grade.service';

describe('GradeService', () => {
  let gradeService: GradeService;
  let httpClientSpy: any;
  const url = environment.apiUrl;

  describe('getTrickListByUserId()', () => {
    let trickMockMas: ITrick[];
    beforeAll(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      trickMockMas = [{ id: 1, name: 'testTrick', complexity: 500, description: 'description' }];
      httpClientSpy.get.and.returnValue(of(trickMockMas));
      gradeService = new GradeService(httpClientSpy);
    });

    it('should return trick list', () => {
      gradeService.getTrickListByUserId().subscribe(result => expect(result).toEqual(trickMockMas));
      expect(httpClientSpy.get.calls.count()).toBe(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith(`${url}/grade/user/1/tricks`);
    });
  });

  describe('getUserListByTrickId()', () => {
    let userMockMas: IUser[];
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
      gradeService = new GradeService(httpClientSpy);
    });

    it('should return user list', () => {
      gradeService.getUserListByTrickId(1).subscribe(result => expect(result).toEqual(userMockMas));
      expect(httpClientSpy.get.calls.count()).toBe(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith(`${url}/grade/tricks/1`);
    });
  });

});
