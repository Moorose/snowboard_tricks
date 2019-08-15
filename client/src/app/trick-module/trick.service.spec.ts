import { TrickService } from "./trick.service";
import { of } from 'rxjs';
import { Trick } from './models/trick';

describe('TrickService', () => {
  let trickService: TrickService;

  it('#getTrickList should return stubbed value from a spy', () => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const trickMock: Trick[] = [{id:1, name:'BackFlip', complexity: 100, description: 'description'}];
    httpClientSpy.get.and.returnValue(of(trickMock));

    trickService = new TrickService(httpClientSpy);

    trickService.getTrickList().subscribe(
      mock => {
        expect(mock).toEqual(trickMock);
      }
    )
    expect(httpClientSpy.get.calls.count()).toBe(1, 'spy method was called once');
  });
});