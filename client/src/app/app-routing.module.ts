import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageComponent } from './user/user-page/user-page.component';
import { HomePageComponent } from './user/home-page/home-page.component';
import { AdminPageComponent } from './user/admin-page/admin-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'user', component: UserPageComponent },
  { path: 'tricks', loadChildren: () => import('./trick/trick.module').then(mod => mod.TrickModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
