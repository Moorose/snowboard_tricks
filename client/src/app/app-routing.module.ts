import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrickListComponent } from './components/trick-list/trick-list.component';


const routes: Routes = [
  { path: '', component: TrickListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
