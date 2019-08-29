import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatVideoModule } from 'mat-video';
import { FileSelectDirective } from 'ng2-file-upload';
import { TrickService } from 'src/app/trick/trick.service';

import { JSONInterceptor } from '../interceptor/JSONInterceptor';

import { AddTrickComponent } from './add-trick/add-trick.component';
import { AdminUploadComponent } from './admin-upload/admin-upload.component';
import { EditTrickComponent } from './edit-trick/edit-trick.component';
import { MyTrickComponent } from './my-trick/my-trick.component';
import { Page404trickComponent } from './page404trick/page404trick.component';
import { TrickListComponent } from './trick-list/trick-list.component';
import { TrickNavComponent } from './trick-nav/trick-nav.component';
import { TrickPageComponent } from './trick-page/trick-page.component';
import { TrickRoutingModule } from './trick-routing.module';
import { TrickComponent } from './trick/trick.component';
import { UserTrickPageComponent } from './user-trick-page/user-trick-page.component';
import { UserUploadComponent } from './user-upload/user-upload.component';

@NgModule({
  declarations: [
    TrickListComponent,
    TrickComponent,
    AddTrickComponent,
    EditTrickComponent,
    TrickPageComponent,
    Page404trickComponent,
    TrickNavComponent,
    FileSelectDirective,
    MyTrickComponent,
    UserTrickPageComponent,
    AdminUploadComponent,
    UserUploadComponent
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
    ReactiveFormsModule,
    MatVideoModule,
  ]
})
export class TrickModule {
}
