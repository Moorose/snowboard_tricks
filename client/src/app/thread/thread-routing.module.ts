import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InviteListComponent } from './invite-list/invite-list.component';
import { Page404threadComponent } from './page404thread/page404thread.component';
import { ThreadItemComponent } from './thread-item/thread-item.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { ThreadNavComponent } from './thread-nav/thread-nav.component';

const routes: Routes = [
  {
    path: '', component: ThreadNavComponent, children: [
      { path: 'list', component: ThreadListComponent },
      { path: 'list/:id', component: ThreadItemComponent },
      { path: 'invite', component: InviteListComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: '**', component: Page404threadComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreadRoutingModule {
}
