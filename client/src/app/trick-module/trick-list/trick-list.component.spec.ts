import { TrickComponent } from "./../trick/trick.component";
import { async, ComponentFixture, TestBed, tick } from "@angular/core/testing";

import { TrickListComponent } from "./trick-list.component";
import { TrickService } from "../trick.service";
import { Trick } from "../models/trick";
import { of } from "rxjs";

describe("TrickListComponent", () => {
  let component: TrickListComponent;
  let quoteEl: HTMLElement;
  let fixture: ComponentFixture<TrickListComponent>;
  let getTrickListSpy: any;

  describe("with tricks", () => {
    beforeEach(() => {
      const trickServiceSpy = jasmine.createSpyObj("TrickService", [
        "getTrickList",
      ]);
      const trickMock: Trick[] = [
        {
          id: 1,
          name: "BackFlip",
          complexity: 100,
          description: "description",
        },
      ];
      getTrickListSpy = trickServiceSpy.getTrickList.and.returnValue(
        of(trickMock),
      );

      TestBed.configureTestingModule({
        declarations: [TrickListComponent, TrickComponent],
        providers: [{ provide: TrickService, useValue: trickServiceSpy }],
      });

      fixture = TestBed.createComponent(TrickListComponent);
      component = fixture.componentInstance;
      quoteEl = fixture.nativeElement.querySelector(".tricks");
    });

    it("should have a Component", () => {
      expect(component).toBeTruthy();
    });

    it("should show div with trick after component initialized", () => {
      fixture.detectChanges();
      expect(quoteEl.textContent.replace(/\s\s+/g, " ")).toBe(
        "1BackFlip100description",
      );
      expect(getTrickListSpy.calls.any()).toBe(true);
    });
  });

  describe("without tricks", () => {
    beforeEach(() => {
      const trickServiceSpy = jasmine.createSpyObj("TrickService", [
        "getTrickList",
      ]);
      const trickMock: Trick[] = [];
      getTrickListSpy = trickServiceSpy.getTrickList.and.returnValue(
        of(trickMock),
      );

      TestBed.configureTestingModule({
        declarations: [TrickListComponent, TrickComponent],
        providers: [{ provide: TrickService, useValue: trickServiceSpy }],
      });

      fixture = TestBed.createComponent(TrickListComponent);
      component = fixture.componentInstance;
      quoteEl = fixture.nativeElement.querySelector(".tricks");
    });

    it("should have a Component", () => {
      expect(component).toBeTruthy();
    });

    it("should show div with message after component initialized", async(() => {
      fixture.detectChanges();
        expect(quoteEl.textContent.replace(/\s\s+/g, " ")).toBe(
          "Tricks was not found!",
        );
        expect(getTrickListSpy.calls.any()).toBe(true);
    }));
  });
});
