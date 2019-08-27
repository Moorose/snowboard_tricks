import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddTrickComponent } from './add-trick/add-trick.component';
import { EditTrickComponent } from './edit-trick/edit-trick.component';
import { TrickListComponent } from './trick-list/trick-list.component';
import { TrickPageComponent } from './trick-page/trick-page.component';
import { Page404trickComponent } from "./page404trick/page404trick.component";
import { TrickNavComponent } from "./trick-nav/trick-nav.component";

const routes: Routes = [
  {
    path: '', component: TrickNavComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: TrickListComponent },
      { path: 'list/addTrick', component: AddTrickComponent },
      { path: 'list/:id', component: TrickPageComponent },
      { path: 'list/editTrick/:id', component: EditTrickComponent },
      { path: '**', component: Page404trickComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrickRoutingModule {
}
