import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { InviteListComponent } from './invite-list/invite-list.component';
import { Page404threadComponent } from './page404thread/page404thread.component';
import { ThreadItemComponent } from './thread-item/thread-item.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { ThreadNavComponent } from './thread-nav/thread-nav.component';
import { ThreadRoutingModule } from './thread-routing.module';

@NgModule({
  declarations: [
    ThreadNavComponent,
    ThreadListComponent,
    ThreadItemComponent,
    Page404threadComponent,
    InviteListComponent
  ],
  imports: [
    CommonModule,
    ThreadRoutingModule,
    ReactiveFormsModule
  ]
})
export class ThreadModule {
}
