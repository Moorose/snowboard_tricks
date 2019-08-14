import { AddTrickComponent } from './components/add-trick/add-trick.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageComponent } from './components/user-page/user-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { EditTrickComponent } from './components/edit-trick/edit-trick.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'user', component: UserPageComponent },
  { path: 'admin/addTrick', component: AddTrickComponent },
  { path: 'admin/editTrick/:id', component: EditTrickComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
