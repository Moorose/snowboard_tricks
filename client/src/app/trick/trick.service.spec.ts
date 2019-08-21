import { of } from 'rxjs';

import { ITrick } from './models/trick';
import { TrickService } from './trick.service';

describe('TrickService', () => {
  let trickService: TrickService;
  let httpClientSpy: any;

  describe('getTrickList()', () => {
    let trickMock: ITrick[];

    beforeAll(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      trickMock = [{ id: 1, name: 'BackFlip', complexity: 100, description: 'description' }];
      httpClientSpy.get.and.returnValue(of(trickMock));
      trickService = new TrickService(httpClientSpy);
    });

    it('should return object list', () => {
      trickService.getTrickList().subscribe(result => expect(result).toEqual(trickMock));
      expect(httpClientSpy.get.calls.count()).toBe(1);
    });
  });

  describe('getTrickById()', () => {
    let trickMock: ITrick;

    beforeAll(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      trickMock = { id: 1, name: 'BackFlip', complexity: 100, description: 'description' };
      httpClientSpy.get.and.returnValue(of(trickMock));
      trickService = new TrickService(httpClientSpy);
    });

    it('should return object by id', () => {
      trickService.getTrickById(1).subscribe(result => expect(result).toEqual(trickMock));
      expect(httpClientSpy.get.calls.count()).toBe(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith('http://localhost:3000/tricks/1');
    });

  });
  describe('addTrick()', () => {

    let trickMock: ITrick;
    let trickMockWithoutId: any;

    beforeAll(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
      trickMock = { id: 1, name: 'BackFlip', complexity: 100, description: 'description' };
      trickMockWithoutId = { name: 'BackFlip', complexity: 100, description: 'description' };
      httpClientSpy.post.and.returnValue(of(trickMock));
      trickService = new TrickService(httpClientSpy);
    });

    it('should return object with id', () => {
      trickService.addTrick(trickMockWithoutId).subscribe(result => expect(result).toEqual(trickMock));
      expect(httpClientSpy.post.calls.count()).toBe(1);
      expect(httpClientSpy.post).toHaveBeenCalledWith('http://localhost:3000/tricks', trickMockWithoutId);
    });

  });
  describe('updateTrick()', () => {

    let trickMock: ITrick;

    beforeAll(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['patch']);
      trickMock = { name: 'BackFlip', complexity: 100, description: 'description' };
      httpClientSpy.patch.and.returnValue(of());
      trickService = new TrickService(httpClientSpy);
    });

    it('should called with mock', () => {
      trickService.updateTrick(1, trickMock);
      expect(httpClientSpy.patch.calls.count()).toBe(1);
      expect(httpClientSpy.patch).toHaveBeenCalledWith('http://localhost:3000/tricks/1', trickMock);
    });

  });

});
