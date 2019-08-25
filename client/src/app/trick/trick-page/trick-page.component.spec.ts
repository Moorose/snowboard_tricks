import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { UserTrickService } from '../../service/user-trick.service';
import { IUserTrick } from '../../user/model/userTrick';
import { ITrick } from '../models/trick';
import { TrickService } from '../trick.service';
import { TrickComponent } from '../trick/trick.component';

import { TrickPageComponent } from './trick-page.component';

describe('TrickPageComponent', () => {
  let component: TrickPageComponent;
  let fixture: ComponentFixture<TrickPageComponent>;
  let trickServiceSpy: any;
  let userTrickServiceSpy: any;
  let locationSpy: any;
  let trickMock: ITrick;
  let userTrickMock: IUserTrick;

  beforeEach(() => {
    trickServiceSpy = jasmine.createSpyObj('TrickService', ['getTrickById']);
    userTrickServiceSpy = jasmine.createSpyObj(
      'userTrickService',
      ['markTrick', 'joinTrickToUser', 'unJoinTrickToUser', 'getTrickListByUserId']
    );
    locationSpy = jasmine.createSpyObj('Location', ['back']);
    TestBed.configureTestingModule({
      declarations: [TrickPageComponent, TrickComponent],
      providers: [
        { provide: TrickService, useValue: trickServiceSpy },
        { provide: UserTrickService, useValue: userTrickServiceSpy },
        { provide: Location, useValue: locationSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: 1 }) } }
        },
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(TrickPageComponent);
    component = fixture.componentInstance;
  });

  it('should have a Component', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit()', () => {
    beforeEach(() => {
      userTrickMock = { id: 1, is_done: true, UserId: 1, TrickId: 1 };
      trickMock = {
        id: 1,
        name: 'BackFlip',
        complexity: 100,
        description: 'description',
        UserTrick: userTrickMock
      };
      trickServiceSpy.getTrickById.and.returnValue(of(trickMock));
      userTrickServiceSpy.getTrickListByUserId.and.returnValue(of([trickMock]));
    });

    it('should call getTrickById with 1', () => {
      fixture.detectChanges();
      expect(trickServiceSpy.getTrickById.calls.count()).toBe(1);
      expect(trickServiceSpy.getTrickById).toHaveBeenCalledWith(1);
      expect(component.favorite).toEqual(true);
    });

    it('should call getTrickListByUserId', () => {
      fixture.detectChanges();
      expect(userTrickServiceSpy.getTrickListByUserId.calls.count()).toBe(1);
      expect(component.mark).toEqual(true);
    });
  });

  describe('markAsDone()', () => {
    describe('mark as done', () => {
      beforeEach(() => {
        userTrickMock = { id: 1, is_done: true, UserId: 1, TrickId: 1 };
        trickMock = {
          id: 1,
          name: 'BackFlip',
          complexity: 100,
          description: 'description',
          UserTrick: userTrickMock
        };
        trickServiceSpy.getTrickById.and.returnValue(of(trickMock));
        userTrickServiceSpy.getTrickListByUserId.and.returnValue(of([trickMock]));
        userTrickMock = { id: 1, is_done: false, UserId: 1, TrickId: 1 };
        userTrickServiceSpy.markTrick.and.returnValue(of(userTrickMock));
        fixture.detectChanges();
      });

      it('should call markTrick', () => {
        component.markAsDone(false);
        expect(userTrickServiceSpy.markTrick.calls.count()).toBe(1);
        expect(component.mark).toEqual(false);
      });
    });

    describe('mark as undone', () => {
      beforeEach(() => {
        userTrickMock = { id: 1, is_done: false, UserId: 1, TrickId: 1 };
        trickMock = {
          id: 1,
          name: 'BackFlip',
          complexity: 100,
          description: 'description',
          UserTrick: userTrickMock
        };
        trickServiceSpy.getTrickById.and.returnValue(of(trickMock));
        userTrickServiceSpy.getTrickListByUserId.and.returnValue(of([trickMock]));
        userTrickMock = { id: 1, is_done: true, UserId: 1, TrickId: 1 };
        userTrickServiceSpy.markTrick.and.returnValue(of(userTrickMock));
        fixture.detectChanges();
      });

      it('should call markTrick', () => {
        component.markAsDone(true);
        expect(userTrickServiceSpy.markTrick.calls.count()).toBe(1);
        expect(component.mark).toEqual(true);
      });
    });
  });

  describe('addToFavorite()', () => {
    beforeEach(() => {
      trickMock = {
        id: 1,
        name: 'BackFlip',
        complexity: 100,
        description: 'description'
      };
      trickServiceSpy.getTrickById.and.returnValue(of(trickMock));
      userTrickServiceSpy.getTrickListByUserId.and.returnValue(of([]));
      userTrickMock = { id: 1, is_done: false, UserId: 1, TrickId: 1 };
      userTrickServiceSpy.joinTrickToUser.and.returnValue(of(userTrickMock));
      fixture.detectChanges();
    });

    it('should call joinTrickToUser', () => {
      component.addToFavorite();
      expect(userTrickServiceSpy.joinTrickToUser.calls.count()).toBe(1);
      expect(component.favorite).toEqual(true);
      expect(component.mark).toEqual(false);
    });
  });

  describe('removeFromFavorite()', () => {
    beforeEach(() => {
      trickMock = {
        id: 1,
        name: 'BackFlip',
        complexity: 100,
        description: 'description'
      };
      trickServiceSpy.getTrickById.and.returnValue(of(trickMock));
      userTrickServiceSpy.getTrickListByUserId.and.returnValue(of([]));
      userTrickServiceSpy.unJoinTrickToUser.and.returnValue(of());
      fixture.detectChanges();
    });

    it('should call joinTrickToUser', () => {
      component.removeFromFavorite();
      expect(userTrickServiceSpy.unJoinTrickToUser.calls.count()).toBe(1);
      expect(component.favorite).toEqual(false);
      expect(component.mark).toEqual(false);
    });
  });
});
