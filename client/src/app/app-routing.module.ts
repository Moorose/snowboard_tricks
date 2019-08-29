import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page404Component } from './page404/page404.component';
import { AuthComponent } from './user/auth/auth.component';
import { HomePageComponent } from './user/home-page/home-page.component';
import { MyPageComponent } from './user/my-page/my-page.component';
import { UserPageComponent } from './user/user-page/user-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'user', component: MyPageComponent },
  { path: 'user/:id', component: UserPageComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'tricks', loadChildren: () => import('./trick/trick.module').then(mod => mod.TrickModule) },
  { path: 'thread', loadChildren: () => import('./thread/thread.module').then(mod => mod.ThreadModule) },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
