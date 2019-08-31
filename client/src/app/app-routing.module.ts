import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page404Component } from './page404/page404.component';
import { AuthComponent } from './user/auth/auth.component';
import { MyPageComponent } from './user/my-page/my-page.component';
import { UserPageComponent } from './user/user-page/user-page.component';

const routes: Routes = [
  { path: 'user', component: MyPageComponent },
  { path: 'user/:id', component: UserPageComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'tricks', loadChildren: () => import('./trick/trick.module').then(mod => mod.TrickModule) },
  { path: 'thread', loadChildren: () => import('./thread/thread.module').then(mod => mod.ThreadModule) },
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
