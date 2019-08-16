// import { TrickComponent } from './../trick/trick.component';
// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { TrickService } from '../trick.service';
// import { ReactiveFormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';
// import { of } from 'rxjs';
// import { EditTrickComponent } from './edit-trick.component';
// import { Trick } from '../models/trick';

// describe('EditTrickComponent', () => {
//     let component: EditTrickComponent;
//     let fixture: ComponentFixture<EditTrickComponent>;
//     let trickServiceSpy: any;

//     beforeEach(() => {
//         trickServiceSpy = jasmine.createSpyObj('TrickService', ['getTrickById', 'updateTrick']);

//         TestBed.configureTestingModule({
//             declarations: [EditTrickComponent, TrickComponent],
//             providers: [{ provide: TrickService, useValue: trickServiceSpy }],
//             imports: [
//                 ReactiveFormsModule,
//                 RouterTestingModule
//             ]
//         });
//         trickServiceSpy.addTrick.and.returnValue(of({}));
//         fixture = TestBed.createComponent(EditTrickComponent);
//         component = fixture.componentInstance;
//     });

//     describe('', () => {

//         beforeEach(() => {
//             const trickMock: Trick = {
//                     id: 1,
//                     name: 'BackFlip',
//                     complexity: 100,
//                     description: 'description',
//                 };
//             trickServiceSpy.getTrickById.and.returnValue(
//                 of(trickMock),
//             );
//         });

//         it('should have a Component', () => {
//             expect(component).toBeTruthy();
//         });

//         // it('save() should call trickService ', () => {
//         //     expect(component.trickForm.valid).toBeFalsy();
//         //     /* tslint:disable:no-string-literal */
//         //     component.trickForm.controls['name'].setValue('BackFlip');
//         //     component.trickForm.controls['complexity'].setValue(100);
//         //     component.trickForm.controls['description'].setValue('Very hard');
//         //     /* tslint:enable:no-string-literal */
//         //     expect(component.trickForm.valid).toBeTruthy();
//         //     component.save();
//         //     expect(trickServiceSpy.addTrick).toHaveBeenCalledWith(jasmine.objectContaining({
//         //         name: 'BackFlip',
//         //         complexity: 100,
//         //         description: 'Very hard'
//         //     }));
//         // });
//     });
// });
