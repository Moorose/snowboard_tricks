import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TrickService } from 'src/app/service/trick.service';

import { JSONInterceptor } from '../interceptor/JSONInterceptor';

import { AddTrickComponent } from './add-trick/add-trick.component';
import { EditTrickComponent } from './edit-trick/edit-trick.component';
import { TrickListComponent } from './trick-list/trick-list.component';
import { TrickRoutingModule } from './trick-routing.module';
import { TrickComponent } from './trick/trick.component';

@NgModule({
  declarations: [
    TrickListComponent,
    TrickComponent,
    AddTrickComponent,
    EditTrickComponent,
  ],
  providers: [
    TrickService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JSONInterceptor,
      multi: true
    }
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TrickRoutingModule,
    ReactiveFormsModule
  ]
})
export class TrickModule {
}
