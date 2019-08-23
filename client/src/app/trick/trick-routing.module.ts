import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddTrickComponent } from './add-trick/add-trick.component';
import { EditTrickComponent } from './edit-trick/edit-trick.component';
import { TrickListComponent } from './trick-list/trick-list.component';
import { TrickPageComponent } from './trick-page/trick-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: TrickListComponent },
  { path: 'list/:id', component: TrickPageComponent },
  { path: 'list/addTrick', component: AddTrickComponent },
  { path: 'list/:id', component: TrickPageComponent },
  { path: 'list/editTrick/:id', component: EditTrickComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrickRoutingModule {
}
